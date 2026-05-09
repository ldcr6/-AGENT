<div align="center">

# 🤖 AI Mock Interview Platform

**基于多模型 AI Agent 的智能面试模拟系统**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Vue](https://img.shields.io/badge/Vue-3-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

</div>

---

## 📖 项目简介

面向求职者的一站式 AI 面试准备平台，通过多模型 AI 面试官提供真实面试模拟体验。系统集成 Coze（扣子）、DeepSeek、讯飞星火三大 LLM，支持多轮追问对话，面试后自动生成评估报告，帮助求职者系统性提升面试能力。

## ✨ 核心功能

### 🎙️ AI 模拟面试
- **多模型 AI 面试官** — 集成 Coze / DeepSeek / 讯飞星火，支持多轮追问
- **实时对话** — WebSocket 长连接，面试过程流畅自然
- **评估报告** — 面试后自动生成多维度评估报告（支持 PDF 导出）

### 📚 题库练习
- **多语言题库** — 涵盖 Java / Python / Vue / React / 前端 / 算法等方向
- **错题本** — 自动收录错题，支持重练和收藏
- **学习路径** — AI 个性化推荐学习路线

### 🎯 激励体系
- **打卡日历** — 每日学习打卡，培养学习习惯
- **学习勋章** — 完成目标解锁成就徽章
- **学习进度** — 可视化跟踪学习进度

### 📝 简历 & 考试
- **简历管理** — 在线编辑简历，支持 PDF 导出
- **在线考试** — 模拟真实考试环境，支持人脸识别防作弊

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────────┐
│                   用户端 (Vue 3)                  │
│         Tailwind CSS · particles.js              │
├─────────────────────────────────────────────────┤
│              管理后台 (Vue 3 + Element Plus)       │
│           Vite · Tailwind CSS · TypeScript        │
├─────────────────────────────────────────────────┤
│              后端服务 (Node.js + Midway.js)        │
│          TypeORM · Cool-Admin · MySQL             │
├─────────────────────────────────────────────────┤
│              AI 能力层 (多模型接入)                │
│      Coze SDK · DeepSeek API · 讯飞星火 API       │
└─────────────────────────────────────────────────┘
```

### 技术栈

| 层级 | 技术 |
|------|------|
| **后端** | Node.js · Midway.js · TypeORM · MySQL |
| **管理后台前端** | Vue 3 · Element Plus · Vite · Tailwind CSS |
| **用户端前端** | Vue 3 · Tailwind CSS · particles.js |
| **AI 接入** | Coze WebSDK · DeepSeek API · 讯飞星火 WebSocket |
| **人脸识别** | 百度 AI SDK · 人脸比对防作弊 |

## 📁 项目结构

```
├── Backendsourcecode/          # 后端服务
│   └── src/
│       └── modules/
│           ├── base/           # 基础模块（用户、权限、菜单）
│           ├── aiInterview/    # AI 面试核心模块
│           ├── interview/      # 面试管理（题目、答案、评论）
│           ├── question/       # 题库管理
│           ├── resume/         # 简历管理
│           └── onlineExam/     # 在线考试
│
├── Frontendsourcecode/         # 管理后台前端
│   └── src/
│       ├── modules/
│       │   ├── aiInterview/    # AI 面试管理界面
│       │   ├── interview/      # 面试内容管理
│       │   ├── question/       # 题库管理
│       │   └── resume/         # 简历管理
│       └── api/
│           ├── coze/           # Coze 集成
│           ├── xinghuo/        # 讯飞星火集成
│           └── deepseek/       # DeepSeek 集成
│
└── code/                       # 用户端前端
    └── src/
        ├── views/
        │   ├── AIinterview.vue # AI 面试入口
        │   ├── Study.vue       # 学习中心
        │   ├── LearningPath.vue # 学习路径
        │   └── OnlineTest.vue  # 在线考试
        └── components/         # 公共组件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- MySQL >= 8.0
- pnpm / npm

### 后端启动

```bash
cd Backendsourcecode
pnpm install
pnpm dev
```

默认访问地址：`http://localhost:8001`

### 管理后台前端启动

```bash
cd Frontendsourcecode
pnpm install
pnpm dev
```

默认访问地址：`http://localhost:9000`

默认测试账号：`admin` / `123456`

### 用户端前端启动

```bash
cd code
pnpm install
pnpm serve
```

## 🔧 AI 模型配置

本项目支持多个 AI 模型接入：

### Coze（扣子）
在 `Frontendsourcecode/src/modules/aiInterview/views/AImockInterviews.vue` 中配置 Bot ID 和 PAT Token。

### 讯飞星火
在 `Frontendsourcecode/src/api/xinghuo/config.js` 中配置 APPID、APISecret 和 APIKey。

### DeepSeek
在后端 `config/config.local.ts` 中配置 API Key。

> ⚠️ **安全提示**：请勿将 API 密钥直接提交到 Git 仓库，建议使用环境变量管理敏感配置。

## 📄 License

[MIT](LICENSE)

## 🙏 致谢

- [Cool-Admin](https://cool-js.com/) — Midway.js 全栈管理框架
- [Midway.js](https://midwayjs.org/) — Node.js 企业级框架
- [Vue 3](https://vuejs.org/) — 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) — Vue 3 UI 组件库

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

</div>
