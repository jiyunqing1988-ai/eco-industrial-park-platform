import { getStore } from "@netlify/blobs";
import { randomUUID } from "node:crypto";
import type { Config, Context } from "@netlify/functions";

type SavedPlan = {
  id: string;
  name: string;
  updatedAt: string;
  attributes: Record<string, unknown>;
  inputs: Record<string, unknown>;
  summary: Record<string, unknown>;
  results: Array<Record<string, unknown>>;
};

const json = (data: unknown, init?: ResponseInit) =>
  Response.json(data, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers || {}),
    },
  });

const readPlans = async (key: string): Promise<SavedPlan[]> => {
  const store = getStore({ name: "eco-industrial-park-plans", consistency: "strong" });
  const data = await store.get(key, { type: "json" });
  return Array.isArray(data) ? (data as SavedPlan[]) : [];
};

const writePlans = async (key: string, plans: SavedPlan[]) => {
  const store = getStore({ name: "eco-industrial-park-plans", consistency: "strong" });
  await store.setJSON(key, plans);
};

export default async (request: Request, context: Context) => {
  const origin = request.headers.get("origin");
  if (request.method !== "GET" && origin && origin !== new URL(request.url).origin) {
    return json({ error: "INVALID_ORIGIN" }, { status: 403 });
  }
  let visitorId = context.cookies.get("eco_visitor");
  if (!visitorId || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(visitorId)) {
    if (request.method !== "GET") return json({ error: "SESSION_REQUIRED" }, { status: 401 });
    visitorId = randomUUID();
    context.cookies.set({
      name: "eco_visitor",
      value: visitorId,
      httpOnly: true,
      secure: new URL(request.url).protocol === "https:",
      sameSite: "Strict",
      path: "/api",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  const key = `visitors/${visitorId}/plans.json`;
  const id = context.params.id;

  if (request.method === "GET") {
    return json({ plans: await readPlans(key) });
  }

  if (request.method === "POST") {
    const body = await request.json().catch(() => null);
    const plan = body?.plan as SavedPlan | undefined;
    if (!plan?.id || !plan?.name) return json({ error: "INVALID_PLAN" }, { status: 400 });

    const plans = await readPlans(key);
    const nextPlan: SavedPlan = {
      ...plan,
      updatedAt: new Date().toISOString(),
    };
    const nextPlans = [nextPlan, ...plans.filter((item) => item.id !== nextPlan.id)].slice(0, 100);
    await writePlans(key, nextPlans);
    return json({ plan: nextPlan, plans: nextPlans }, { status: 201 });
  }

  if (request.method === "DELETE") {
    if (!id) return json({ error: "MISSING_ID" }, { status: 400 });
    const plans = await readPlans(key);
    const nextPlans = plans.filter((plan) => plan.id !== id);
    await writePlans(key, nextPlans);
    return json({ plans: nextPlans });
  }

  return json({ error: "METHOD_NOT_ALLOWED" }, { status: 405 });
};

export const config: Config = {
  path: ["/api/plans", "/api/plans/:id"],
  method: ["GET", "POST", "DELETE"],
};
