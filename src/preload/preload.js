const { contextBridge, ipcRenderer } = require('electron');
// import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, callback) => {
    ipcRenderer.on(channel, (_event, ...args) => callback(...args));
  },
  onUpdateChecking: (callback) => ipcRenderer.on('update:checking', callback),
  onUpdateAvailable: (callback) => ipcRenderer.on('update:available', callback),
  onUpdateNotAvailable: (callback) => ipcRenderer.on('update:not-available', callback),
  onUpdateProgress: (callback) => ipcRenderer.on('update:progress', (event, data) => {
    callback(data);
  }),
  onUpdateDownloaded: (callback) => ipcRenderer.on('update:downloaded', callback),
  onUpdateError: (callback) => ipcRenderer.on('update:error', (event, data) => {
    callback(data);
  })
});
