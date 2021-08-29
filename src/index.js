"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const isDev = __importStar(require("electron-is-dev"));
if (isDev) {
    require("electron-reload")(__dirname, {
        electron: require("path").join(__dirname, "..", "node_modules", ".bin", "electron"),
        forceHardReset: true,
        hardResetMethod: "exit",
    });
}
const createWindow = () => {
    let win = new electron_1.BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            enableRemoteModule: true,
            preload: path.join(electron_1.app.getAppPath(), "src/preload.js")
        }
    });
    win.loadFile("src/index.html");
    win.webContents.openDevTools();
    return win.id;
};
const setTheme = (tname) => {
    let w = electron_1.BrowserWindow.getFocusedWindow();
    w?.webContents.executeJavaScript('setTheme("' + tname + '")');
};
const setMode = (mname) => {
    let w = electron_1.BrowserWindow.getFocusedWindow();
    w?.webContents.executeJavaScript('setMode("' + mname + '")');
};
const setFontSize = (n) => {
    let w = electron_1.BrowserWindow.getFocusedWindow();
    w?.webContents.executeJavaScript('setFontSize(' + n + ')');
};
const createMenu = () => {
    let menuTemp = [
        {
            label: "File",
            submenu: [
                { label: "New", click: () => {
                        createWindow();
                    } },
                { role: "close" },
                { type: "separator" },
                { role: "quit" }
            ]
        },
        { role: "editMenu" },
        {
            label: "Theme",
            submenu: [
                { label: "textmate", click: () => setTheme("textmate") },
                { label: "chrome", click: () => setTheme("chrome") },
                { label: "github", click: () => setTheme("github") },
                { label: "dracula", click: () => setTheme("dracula") },
                { label: "twilight", click: () => setTheme("twilight") },
                { label: "pastel on dark", click: () => setTheme("pastel_on_dark") }
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
    let menu = electron_1.Menu.buildFromTemplate(menuTemp);
    electron_1.Menu.setApplicationMenu(menu);
};
createMenu();
electron_1.app.whenReady().then(createWindow);
//# sourceMappingURL=index.js.map