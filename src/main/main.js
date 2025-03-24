// const { app, BrowserWindow } = require('electron');
// const path = require('path');
import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

import { autoUpdater } from "electron-updater";
import log from "electron-log";

import path from 'path'
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

autoUpdater.on('checking-for-update', () => {
  log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
  log.info('업데이트가 가능합니다.');
});
autoUpdater.on('update-not-available', (info) => {
  log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
  log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  log.info(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  log.info('업데이트가 완료되었습니다.');
});

app.on('ready', () => {
  // 메인 창 생성
  createWindow();
  
  // 자동 업데이트 등록
  autoUpdater.checkForUpdates();
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on('window-all-closed', () => {
  app.quit();
});
