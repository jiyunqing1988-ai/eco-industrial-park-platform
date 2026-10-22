# 生态工业园区评价与诊断平台

**Eco-Industrial Park Assessment Platform**

面向工业园区研究、环境管理与绿色转型工作的开源评价工具。将园区基础数据转换为可查看的指标结果和诊断建议，并支持保存、载入与多方案对比。

[在线体验](https://eco-industrial-park-platform.netlify.app/) · [报告问题](https://github.com/jiyunqing1988-ai/eco-industrial-park-platform/issues) · [MIT 许可证](LICENSE)

## 功能

- 基础录入：经济产出、碳排放、能源水耗、污染物、资源循环和创新生态数据。
- 指标看板：39 条指标记录，覆盖减污降碳、发展质效、创新驱动、生态引领四个维度。
- 基本要求：13 项独立检查项。
- 诊断建议：显示未达标指标、数值差距与对应的任务和工程建议。
- 方案管理：服务器保存、载入、删除，最多保存最近 100 个方案。
- 方案对比：同时选择最多 4 个方案，对比汇总结果与关键指标。
- 数据交换：JSON 导入、导出；导出文件名包含 `YYYYMMDDHHmm` 时间前缀。
- 免注册访问：每个浏览器通过随机访客 Cookie 拥有独立方案库。

## 项目状态

当前是早期开源版本，已提供可访问的在线演示。默认输入为演示数据，不对应真实园区。本仓库不宣称已有规模化用户、下载量或外部认证。

评价规则来自项目原型，目前尚未完成逐项标准溯源和独立专业复核。指标记录包含并列候选项；总体达标比例和“必选未达标”是逐行统计，不代表官方综合评价结论。高耗能、高耗水场景中的示例阈值以及诊断建议，仍需结合适用标准和行业情况核验。

欢迎优先贡献规则出处、计算口径、单位校核、边界条件和可复现测试用例。

## 本地运行

需要 Node.js 22 或更高版本、npm。

```bash
npm ci
npm test
npm run dev
```

`npm run dev` 启动 Vite 前端，终端会显示访问地址。该模式可查看录入、指标和诊断页面，但不提供 `/api/plans` 接口，因此服务器保存、导入和方案库读取需要以下完整运行方式。

### 完整运行和部署

方案存储使用 Netlify Functions 与 Netlify Blobs，需要你自己的 Netlify 站点和账号。

```bash
npx netlify login
npx netlify init
npx netlify dev
```

已经创建站点时，可用 `npx netlify link` 替代 `init`。`.netlify/` 是本地关联信息，不能提交。Blobs 在本地开发时使用独立存储，与线上方案分离。按终端提示访问 Netlify Dev 地址，而非直接访问 Vite 端口。

```bash
npm test
npx netlify build
npx netlify deploy --prod
```

仓库内的 `netlify.toml` 已指定构建命令、`dist/` 发布目录和 Functions 目录。也可以在 Netlify 控制台导入自己的 GitHub 仓库，获得自动部署。静态托管或 GitHub Pages 只能提供前端，不能独立运行服务器方案库。

项目不需要 OpenAI API 密钥；当前计算与诊断均由本地规则实现。

## 数据与隐私

- 方案数据存放在 Netlify Blobs；公开源码不包含线上方案数据或部署凭据。
- 访客标识使用服务端生成的随机 UUID，通过 HttpOnly、SameSite=Strict Cookie 传递，HTTPS 下带 Secure 属性。
- Cookie 有效期为一年。清除 Cookie、使用无痕模式或换浏览器后，无法自动访问原访客方案库；请使用 JSON 导出备份和转移。
- 不同浏览器的访客库互相独立。当前没有账号恢复、跨设备自动同步、团队协作或共享链接。
- 当前存储按访客方案列表整体读写；同一访客多个标签页同时修改时，尚无并发冲突合并机制。
- 现阶段接口仅有基础输入检查，未提供完整的配额、限流和敏感数据管理。公开演示建议使用示例或脱敏数据。

## 代码结构

| 路径 | 用途 |
| --- | --- |
| `src/main.jsx` | React 界面、方案操作与 JSON 交换 |
| `src/platform.js` | 指标元数据、演示数据、计算和快照 |
| `src/styles.css` | 响应式页面样式 |
| `netlify/functions/plans.mts` | 访客会话与方案 API |
| `tests/` | 指标计算回归测试 |
| `.github/workflows/` | GitHub Actions 测试与构建检查 |

## 参与贡献

贡献流程见 [贡献说明](docs/202610220858—CONTRIBUTING.md)。欢迎通过 Issue 提交可复现的问题，通过 Pull Request 提交改动。修改指标规则时，请同时提供可访问的规则出处、版本、单位以及边界测试，区分“修正实现”与“更换评价口径”。

近期维护方向：规则版本化与来源标注、缺失值和零分母处理、API 数据校验、方案并发保护，以及可访问性改进。这些是计划方向，尚未全部实现。

## English Summary

An early-stage, MIT-licensed web tool for eco-industrial park assessment and scenario comparison. It includes 39 indicator records across four dimensions, a 13-item checklist, rule-based diagnostics, server-side scenario storage, comparison of up to four scenarios, and timestamped JSON import/export.

Built with React, Vite, Netlify Functions and Netlify Blobs. Visitors can use the live demo without registering. A random, browser-specific HttpOnly cookie isolates each visitor's saved scenarios. Changing browsers or clearing cookies requires transferring scenarios with JSON files.

Run `npm ci`, `npm test` and `npm run dev` for the frontend. Use `npx netlify dev` with your own linked Netlify site for the complete API and storage workflow. No OpenAI API key is required.

This is a working prototype rather than a certified assessment methodology. Indicator thresholds, alternative indicator groups and sector-specific assumptions need source attribution and independent domain review. We welcome reproducible issues, methodology references, tests and focused pull requests. Adoption metrics are not yet established.

## 许可证

源代码采用 [MIT](LICENSE) 许可证。第三方依赖保留各自许可证。
