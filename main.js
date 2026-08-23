const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('get-channels', async () => {
  try {
    const channels = require('./data/channels.json');
    return channels;
  } catch (error) {
    console.error('Error loading channels:', error);
    return [];
  }
});

ipcMain.handle('get-epg', async (event, channelId) => {
  try {
    const epgData = require('./data/epg.json');
    return epgData[channelId] || [];
  } catch (error) {
    console.error('Error loading EPG:', error);
    return [];
  }
});

ipcMain.handle('stream-channel', async (event, streamUrl) => {
  return {
    success: true,
    url: streamUrl,
    message: 'Stream ready',
  };
});
