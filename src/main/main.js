// const { app, BrowserWindow } = require('electron');
// const path = require('path');
import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

import updater from "electron-updater";

const { autoUpdater } = updater;
import log from "electron-log";
import "./handlers/index.js";

import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = !app.isPackaged;
const preloadPath = 'preload.mjs';
const renderPath = isDev ? '../renderer/index.html' : 'renderer/index.html';
const envPath = isDev ? '../../.env.prod' : '.env.prod';
config({ path: path.join(__dirname, envPath)})
async function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    minWidth: 475,
    height: 768,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, preloadPath),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
      webSecurity: true
      
    },
    frame: false
  });
  
  if (isDev) {
    await win.loadURL(`${process.env.VITE_APP_URL}:${process.env.VITE_APP_PORT}`);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(path.join(__dirname, renderPath));
    win.webContents.openDevTools();
  }
  ipcMain.on('max-window', () => {
    win.maximize();
  })
  ipcMain.on('unmax-window', () => {
    win.unmaximize();
  })
  ipcMain.on('min-window', () => {
    win.minimize();
  })
  return win;
}

app.on('ready', async () => {
  // 메인 창 생성
  const win = await createWindow();
  autoUpdater.on('checking-for-update', () => {
    log.info('업데이트 확인 중...');
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:checking')
  });
  autoUpdater.on('update-available', (info) => {
    log.info('업데이트가 가능합니다.');
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:available')
  });
  autoUpdater.on('update-not-available', (info) => {
    log.info('현재 최신버전입니다.');
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:not-available')
  });
  autoUpdater.on('error', (err) => {
    log.info('에러가 발생하였습니다. 에러내용 : ' + err);
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:error', err)
  });
  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:progress', progressObj)
    log.info(log_message);
  })
  autoUpdater.on('update-downloaded', (info) => {
    log.info('업데이트가 완료되었습니다.');
    win.close();
    app.quit();
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:downloaded')
  });
  // 자동 업데이트 등록
  autoUpdater.checkForUpdates();
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on('window-all-closed', () => {
  app.quit();
});



