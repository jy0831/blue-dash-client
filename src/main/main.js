// const { app, BrowserWindow } = require('electron');
// const path = require('path');
import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)})

async function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
      webSecurity: true
      
    },
    frame: false
  });
  // console.log('###LOG: ', app.isPackaged);
  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL(`${process.env.VITE_APP_URL}:${process.env.VITE_APP_PORT}`);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);
