import { app, BrowserWindow, Menu, Tray } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

type MenuObjectType = (Electron.MenuItemConstructorOptions | Electron.MenuItem)[]

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require("path").join(__dirname, "..", "node_modules", ".bin", "electron"),
    forceHardReset: true,
    hardResetMethod: "exit",
  })
}

const createWindow = (): number => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), "preload.js")
    }
  });
  win.loadFile("index.html");
  return win.id;
}

const createMenu = () => {
  let menuTemp: MenuObjectType = [
    {
      label: "File",
      submenu: [
        {label: "New", click: () => {
          createWindow()
        }},
        {role: "close"},
        {type: "separator"},
        {role: "quit"}
      ]
    },
    {role: "editMenu"}
  ];
  let menu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(menu)
}

createMenu();
app.whenReady().then(createWindow);
