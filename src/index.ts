import { app, BrowserWindow, Menu, Tray } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require("path").join(__dirname, "..", "node_modules", ".bin", "electron"),
    forceHardReset: true,
    hardResetMethod: "exit",
  })
}
