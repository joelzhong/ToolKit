const { contextBridge, ipcRenderer } = require('electron');

// 暴露安全的 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 打开文件
  openFile: () => ipcRenderer.invoke('open-file'),

  // 打开文件夹
  openFolder: () => ipcRenderer.invoke('open-folder'),

  // 保存文件
  saveFile: (filePath, content) => ipcRenderer.invoke('save-file', { filePath, content }),

  // 另存为
  saveAs: (content, defaultName) => ipcRenderer.invoke('save-as', { content, defaultName }),

  // 导出 HTML
  exportHTML: (content, defaultName) => ipcRenderer.invoke('export-html', { content, defaultName }),

  // 处理拖拽文件
  handleDropFiles: (files) => ipcRenderer.invoke('handle-drop-files', { files })
});
