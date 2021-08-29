const { remote } = require("electron");
const fs = require("fs");
const path = require("path")
const { dialog, BrowserWindow } = remote;

window.remote = remote;
window.BrowserWindow = BrowserWindow;
window.dialog = dialog;
window.fs = fs;
window.path = path;
