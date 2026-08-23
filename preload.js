const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getChannels: () => ipcRenderer.invoke('get-channels'),
  getEPG: (channelId) => ipcRenderer.invoke('get-epg', channelId),
  streamChannel: (streamUrl) => ipcRenderer.invoke('stream-channel', streamUrl),
});
