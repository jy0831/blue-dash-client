// const { app, BrowserWindow } = require('electron');
// const path = require('path');
import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import { query } from "./mariadb.js";
import updater from "electron-updater";
const { autoUpdater } = updater;
import log from "electron-log";

import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isDev = !app.isPackaged;
const preloadPath = isDev ? '../preload/preload.js' : 'preload.mjs';
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
  // console.log('###LOG: ', app.isPackaged);
  
  if (isDev) {
    await win.loadURL(`${process.env.VITE_APP_URL}:${process.env.VITE_APP_PORT}`);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(path.join(__dirname, renderPath));
    // win.webContents.openDevTools();
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
ipcMain.handle('getData:date', async (e, data) => {
  console.log(data);
  
  const queryStr = `
    with staticViwers as (
      select ts.NAME, count(vs.ID) as STATIC_VIWERS, tb.BROADCAST_DATE from tb_daily_view_scores vs
      left join tb_users tu on vs.USER_ID = tu.ID
      left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
      left join tb_streamers ts on ts.ID = tb.STREAMER_ID
      where tb.BROADCAST_DATE = '${data}' and vs.TOTAL_VIEW_TIME > (tb.DURATION/2) 
      group by ts.NAME
    )
    select ts.NAME, count(vs.ID) as VIWERS, sv.static_viwers as STATIC_VIWERS, tb.BROADCAST_DATE from tb_daily_view_scores vs
    left join tb_users tu on vs.USER_ID = tu.ID
    left join tb_broadcasts tb on vs.BROADCAST_ID = tb.ID
    left join tb_streamers ts on ts.ID = tb.STREAMER_ID
    left join staticViwers sv on sv.NAME = ts.NAME
    where tb.BROADCAST_DATE = '${data}'
    group by ts.NAME;
  `;
  const result = await query(queryStr);
  return result;
})
app.on('ready', async () => {
  // 메인 창 생성
  await createWindow();
  log.info(process.env);
  log.info(process.env.GH_TOKEN);
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
    BrowserWindow.getAllWindows()[0]?.webContents.send('update:downloaded')
  });
  // 자동 업데이트 등록
  autoUpdater.checkForUpdates();
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on('window-all-closed', () => {
  app.quit();
});



