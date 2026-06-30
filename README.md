# Social Media Image Studio

![Project Cover](./assets/project-cover.svg)

一个面向内容团队与个人创作者的轻量图片工作台，用于把原图快速适配到小红书、抖音、Instagram 等常用发图尺寸。项目运行在浏览器中，强调直接、清晰、低学习成本的裁切与导出体验。

## Overview

Social Media Image Studio is a browser-based image preparation tool for social publishing workflows. It focuses on fast ratio conversion, per-image crop persistence, reusable presets, and clean batch export without requiring a design tool.

## Highlights

- Multi-image queue with per-image crop and zoom state
- HEIC and HEIF import handling to avoid blank preview failures
- Fill and fit output modes for different publishing needs
- Drag-to-position and wheel-to-zoom editing in the preview area
- Grid overlays with adjustable color, opacity, and inset
- Neutral film grain effect applied to both preview and export
- Batch export to JPG, PNG, or WebP, with ZIP packaging support
- Custom size templates stored in local browser storage

## Built-in Presets

| Platform | Presets |
| --- | --- |
| Xiaohongshu | 1080 x 1440, 1080 x 1080, 1200 x 900, 1080 x 1920 |
| Douyin | 1080 x 1440, 1080 x 1920, 1080 x 1080, 1920 x 1080 |
| Instagram | 1080 x 1350, 1080 x 1440, 1080 x 1080, 1080 x 566, 1080 x 1920 |

## Interface

当前界面分为三块核心区域：

- 左侧：上传、输出设置、模板预设
- 中间：预览与裁切操作
- 下方：效果总览，直接查看当前预设下的输出结果

![App Preview](./assets/app-preview.png)

## Getting Started

### Requirements

- Node.js 18 or later

### Run locally

```bash
npm install
npm run dev
```

默认地址：

```text
http://127.0.0.1:8786
```

如果希望直接双击启动，也可以使用：

```bash
./start-local.command
```

## Project Structure

```text
.
├── assets/
│   ├── app-preview.png
│   └── project-cover.svg
├── app.js
├── index.html
├── package.json
├── scripts/
│   └── dev-server.mjs
├── start-local.command
└── styles.css
```

## Stack

- Vanilla HTML, CSS, and JavaScript
- Canvas-based preview and export pipeline
- Local Node.js development server

## Use Cases

- Prepare one source image for multiple platform ratios
- Keep repeated crop work consistent across a batch
- Export social-ready assets without opening heavier design software

## License

MIT
