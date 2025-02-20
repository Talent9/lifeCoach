# Life Coach AI 项目

## 版本信息
当前版本：v0.1

## 项目简介
这是一个基于DeepSeek R1 API的智能生活教练网站，通过AI对话为用户提供个人成长建议和指导。

## 技术架构
- 前端：HTML5 + CSS3（响应式设计）
- 后端：Node.js
- AI接口：火山方舟 DeepSeek R1 API

## 项目结构
```
/
├── public/          # 静态资源目录
│   ├── css/         # 样式文件
│   ├── js/          # JavaScript文件
│   └── index.html   # 主页面
├── server/          # 后端服务目录
│   └── server.js    # Node.js服务器文件
├── package.json     # 项目依赖配置
└── README.md        # 项目说明文档
```

## 当前版本（v0.1）功能
### 核心功能
1. AI智能对话
   - 实时对话响应
   - 流式文本输出
   - 个性化生活建议

### 界面特性
1. 现代简约的用户界面
   - 简洁直观的对话界面
   - 动态粒子背景效果
   - 渐变色主题设计

2. 响应式布局
   - 适配桌面端和移动端
   - 流畅的页面交互体验
   - 优雅的视觉过渡效果

## 页面布局
### 主页面 (index.html)
- 顶部：标题栏
- 中间：对话内容显示区域
- 底部：消息输入框和发送按钮

## 开发规范
- 使用语义化HTML标签
- CSS采用Flexbox和Grid布局
- 代码添加中文注释
- 遵循W3C标准

## 启动说明
1. 安装依赖：`npm install`
2. 启动服务器：`npm start`
3. 访问地址：`http://localhost:3000`