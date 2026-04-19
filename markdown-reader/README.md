# Markdown Reader

一个简洁的Markdown阅读器和编辑器，基于Web技术构建。

## 功能特性

- ✅ 实时Markdown预览（编辑与预览同步显示）
- ✅ 分割视图（左侧编辑，右侧预览）
- ✅ 左侧边栏显示文件列表
- ✅ 拖拽调整分割比例
- ✅ 代码语法高亮
- ✅ 响应式设计，界面美观

## 快捷键

- `Ctrl+O` - 打开文件
- `Ctrl+S` - 保存文件

## 项目结构

```
markdown-reader/
├── markdown-browser.html   # 主应用（HTML + CSS + JS）
└── README.md              # 说明文档
```

## 如何运行

直接在浏览器中打开 `markdown-browser.html` 即可使用：

```bash
# 直接用浏览器打开
start markdown-browser.html  # Windows
open markdown-browser.html   # macOS
xdg-open markdown-browser.html  # Linux
```

或者使用简单的HTTP服务器：

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server .
```

然后访问 http://localhost:8000/markdown-browser.html

## 技术栈

- HTML5 + CSS3 - 界面布局
- JavaScript (ES6+) - 交互逻辑
- Marked.js - Markdown解析
- Highlight.js - 代码语法高亮

## 使用说明

1. **打开文件**：点击左侧边栏上方的"+"按钮或使用快捷键 `Ctrl+O`
2. **编辑内容**：在左侧编辑器中输入Markdown内容
3. **预览效果**：右侧实时显示渲染后的Markdown效果
4. **保存文件**：使用快捷键 `Ctrl+S` 保存更改

## 注意事项

- 本应用支持基本的Markdown语法
- 支持表格、引用、列表、链接、图片等Markdown特性
- 拖拽中间的分隔条可以调整编辑器和预览区的宽度比例

## 未来改进

- 添加更多Markdown扩展功能
- 支持主题切换
- 添加导出功能（PDF、HTML等）
- 支持拼写检查
- 添加目录导航功能
- 支持代码块语法高亮