import { app, BrowserWindow, Menu } from "electron";
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
    width: 1200,
    height: 900,
    webPreferences: {
      enableRemoteModule: true,
      contextIsolation: false, // TODO: なんかこれもいるみたい！
      preload: path.join(app.getAppPath(), "src/preload.js")
    }
  });
  win.loadFile("src/index.html");
  win.webContents.openDevTools();
  return win.id;
}

const setTheme = (tname: string) => {
  let w = BrowserWindow.getFocusedWindow();
  w?.webContents.executeJavaScript('setTheme("' + tname + '")');
}

const setMode = (mname: string) => {
  let w = BrowserWindow.getFocusedWindow();
  w?.webContents.executeJavaScript('setMode("' + mname + '")');
}

const setFontSize = (n: number) => {
  let w = BrowserWindow.getFocusedWindow();
  w?.webContents.executeJavaScript('setFontSize(' + n + ')');
}

const openfolder = () => {
  let w = BrowserWindow.getFocusedWindow();
  w?.webContents.executeJavaScript("openfolder()");
}

const createfile = () => {
  let w = BrowserWindow.getFocusedWindow();
  w?.webContents.executeJavaScript("createfile()");
}

const createMenu = () => {
  let menuTemp: MenuObjectType = [
    {
      label: "File",
      submenu: [
        {label: "New", click: () => {
          createWindow()
        }},
        { label: "open folder...", click: () => {
          openfolder();
        }},
        { label: "Create file", click: () => {
          createfile();
        }},
        {role: "close"},
        {type: "separator"},
        {role: "quit"}
      ]
    },
    {role: "editMenu"},
    {
      label: "Theme",
      submenu: [
        { label: "textmate", click: () => setTheme("textmate") },
        { label: "chrome", click: () => setTheme("chrome") },
        { label: "github", click: () => setTheme("github") },
        { label: "dracula", click: () => setTheme("dracula") },
        { label: "twilight", click: () => setTheme("twilight") },
        { label: "pastel on dark", click: () => setTheme("pastel_on_dark")}
      ]
    },
    {
      label: "Mode",
      submenu: [
        { label: "text", click: () => setMode("text") },
        { label: "javascript", click: () => setMode("javascript") },
        { label: "typescript", click: () => setMode("typescript") },
        { label: "html", click: () => setMode("html") },
        { label: "python", click: () => setMode("python") },
        { label: "php", click: () => setMode("php") },
      ]
    },
    {
      label: "Font",
      submenu: [
        { label: "9", click: () => setFontSize(9) },
        { label: "10", click: () => setFontSize(10) },
        { label: "12", click: () => setFontSize(12) },
        { label: "14", click: () => setFontSize(14) },
        { label: "16", click: () => setFontSize(16) },
        { label: "18", click: () => setFontSize(18) },
        { label: "20", click: () => setFontSize(20) },
        { label: "24", click: () => setFontSize(24) },
      ]
    }
  ];
  let menu = Menu.buildFromTemplate(menuTemp);
  Menu.setApplicationMenu(menu)
}

createMenu();
app.whenReady().then(createWindow);
