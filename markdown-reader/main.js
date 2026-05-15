const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    show: false
  });

  // 加载应用
  mainWindow.loadFile('markdown-browser.html');

  // 窗口准备好后显示
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 窗口关闭时
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 应用准备就绪
app.whenReady().then(createWindow);

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// macOS 上点击 dock 图标时重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 处理打开文件
ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Markdown files', extensions: ['md', 'markdown'] },
      { name: 'HTML files', extensions: ['html', 'htm'] },
      { name: 'Text files', extensions: ['txt'] },
      { name: 'All files', extensions: ['*'] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const files = [];
  for (const filePath of result.filePaths) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath);
      files.push({
        name: fileName,
        content: content,
        path: filePath
      });
    } catch (err) {
      console.error('Error reading file:', filePath, err);
    }
  }

  return files;
});

// 处理打开文件夹
ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (result.canceled) {
    return null;
  }

  const folderPath = result.filePaths[0];
  const files = [];

  try {
    const items = fs.readdirSync(folderPath);
    for (const item of items) {
      const filePath = path.join(folderPath, item);
      const stat = fs.statSync(filePath);

      if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.markdown') || item.endsWith('.txt') || item.endsWith('.html') || item.endsWith('.htm'))) {
        const content = fs.readFileSync(filePath, 'utf-8');
        files.push({
          name: item,
          content: content,
          path: filePath
        });
      }
    }
  } catch (err) {
    console.error('Error reading folder:', err);
    return null;
  }

  return { folderPath, files };
});

// 处理拖拽文件
ipcMain.handle('handle-drop-files', async (event, { files }) => {
  const result = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file.path, 'utf-8');
      result.push({
        name: file.name,
        content: content,
        path: file.path
      });
    } catch (err) {
      console.error('Error reading dropped file:', file.path, err);
    }
  }

  return result;
});

// 处理保存文件
ipcMain.handle('save-file', async (event, { filePath, content }) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true };
  } catch (err) {
    console.error('Error saving file:', err);
    return { success: false, error: err.message };
  }
});

// 处理另存为
ipcMain.handle('save-as', async (event, { content, defaultName }) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName || 'untitled.md',
    filters: [
      { name: 'Markdown files', extensions: ['md', 'markdown'] },
      { name: 'Text files', extensions: ['txt'] },
      { name: 'All files', extensions: ['*'] }
    ]
  });

  if (result.canceled) {
    return null;
  }

  try {
    fs.writeFileSync(result.filePath, content, 'utf-8');
    return { success: true, filePath: result.filePath };
  } catch (err) {
    console.error('Error saving file:', err);
    return { success: false, error: err.message };
  }
});

// 处理导出 HTML
ipcMain.handle('export-html', async (event, { content, defaultName }) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultName ? defaultName.replace(/\.md$/, '.html') : 'export.html',
    filters: [
      { name: 'HTML files', extensions: ['html', 'htm'] }
    ]
  });

  if (result.canceled) {
    return null;
  }

  try {
    fs.writeFileSync(result.filePath, content, 'utf-8');
    return { success: true, filePath: result.filePath };
  } catch (err) {
    console.error('Error exporting HTML:', err);
    return { success: false, error: err.message };
  }
});
