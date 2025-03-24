"use strict";const{contextBridge:c,ipcRenderer:r}=require("electron");c.exposeInMainWorld("electron",{send:(e,n)=>{r.send(e,n)},receive:(e,n)=>{r.on(e,(i,...t)=>n(...t))}});
