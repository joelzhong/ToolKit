# Markdown Reader

一个离线可用的 Markdown 编辑器，支持实时预览、代码高亮、Mermaid 流程图、目录导航等功能。

## 功能特性

- 📝 实时 Markdown 预览
- 🎨 代码高亮（支持 JavaScript、Python、Java、C++、SQL、JSON 等）
- 📊 Mermaid 流程图支持
- 📑 目录导航（自动提取 h1/h2/h3）
- 📁 工作空间管理
- 💾 本地存储自动保存
- 🌐 HTML 导出
- 🔄 HTML 转 Markdown（拖入 HTML 文件自动转换）
- 📦 离线使用（无需网络）

## 使用方式

### 方式一：直接打开 HTML（浏览器）

1. 确保目录结构完整：
   ```
   markdown-reader/
   ├── markdown-browser.html    # 主应用文件
   ├── js/                      # JS 依赖目录
   │   ├── marked.min.js
   │   ├── highlight.core.min.js
   │   ├── highlight.*.min.js
   │   ├── mermaid.min.js
   │   └── turndown.min.js
   └── css/                     # CSS 样式目录
       └── github.min.css
   ```

2. 双击 `markdown-browser.html` 即可在浏览器中打开

### 方式二：Electron 桌面应用（推荐）

#### 安装依赖

```bash
npm install
```

#### 开发模式运行

```bash
npm start
```

#### 打包应用

```bash
# 打包所有平台
npm run build

# 仅打包 Windows
npm run build:win

# 仅打包 macOS
npm run build:mac

# 仅打包 Linux
npm run build:linux
```

打包后的应用位于 `dist` 目录。

## 文件结构

```
markdown-reader/
├── markdown-browser.html    # 主应用文件
├── main.js                  # Electron 主进程
├── preload.js               # Electron 预加载脚本
├── package.json             # 项目配置
├── README.md                # 本文件
├── js/                      # JavaScript 依赖
│   ├── marked.min.js        # Markdown 解析器
│   ├── highlight.core.min.js    # 代码高亮核心
│   ├── highlight.javascript.min.js
│   ├── highlight.python.min.js
│   ├── highlight.java.min.js
│   ├── highlight.cpp.min.js
│   ├── highlight.sql.min.js
│   ├── highlight.json.min.js
│   ├── mermaid.min.js       # Mermaid 流程图
│   └── turndown.min.js      # HTML 转 Markdown
└── css/                     # CSS 样式
    └── github.min.css       # 代码高亮样式
```

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| Ctrl + O | 打开文件 |
| Ctrl + S | 保存文件 |
| Ctrl + N | 新建文件 |
| Ctrl + Enter | 保存编辑（编辑模式下） |
| Escape | 取消编辑（编辑模式下） |

## 技术栈

- **前端**: 原生 HTML/CSS/JavaScript
- **Markdown 解析**: Marked.js
- **代码高亮**: Highlight.js
- **流程图**: Mermaid.js
- **HTML 转换**: Turndown.js
- **桌面应用**: Electron

## 许可证

MIT
