let editor = null;
let folderPath = null;
let folderItems = null;
let currentFname = null;
let sidebar = null;
let footer = null;
let changeFlg = false;
const BrowserWindow = window.BrowserWindow;
const dialog = window.dialog;
const fs = window.fs;
const path = window.path;

function setTheme(tname) {
  editor.setTheme("ace/theme/" + tname);
}

function setMode(mname) {
  editor.session.setMode("ace/mode/" + mname);
}

function setFontSize(n) {
  editor.setFontSize(n);
}

function savefile() {
  if (!changeFlg) {
    return;
  }
  let fpath = path.join(folderPath, currentFname);
  let data = editor.session.getDocument().getValue();
  fs.writeFile(fpath, data, (err) => {
    changeFlg = false;
  })
}

function loadPath() {
  fs.readdir(folderPath, (err, files) => {
    folderItems = files;
    let tag = "<ul>";
    for (const n in files) {
      tag += '<li id="item ' + n + '" onclick="openfile(' + n + ')">' + files[n] + '</li>';
    }
    tag += "</ul>";
    sidebar.innerHTML = tag;
  })
}

function onLoad() {
  let w = BrowserWindow.getFocusedWindow();
  w.on("close", (e) => {
    savefile();
  })
  footer = document.querySelector("#footer");
  sidebar = document.querySelector("#sidebar");
  editor = ace.edit("editor_area");
  setTheme("textmate")
  setMode("text")
  editor.focus();
  editor.session.getDocument().on("change", (ob) => {
    changeFlg = true;
  })

  sidebar.addEventListener("dragover", (event) => {
    event.preventDefault();
    currentFname = null;
    folderPath = null;
    folderItems = null;
  })

  sidebar.addEventListener("drop", (event) => {
    editor.session.getDocument().setValue("");
    changeFlg = false;
    const folder = event.dataTransfer.files[0];
    folderPath = folder.path;
    loadPath();
  })
}

function openfolder() {
  savefile();
  let w = BrowserWindow.getFocusedWindow();
  let result = dialog.showOpenDialogSync(w, {
    properties: ["openDirectory"]
  });
  if (result != undefined) {
    folderPath = result[0];
    loadPath();
    footer.textContent = 'open dir:"' + folderPath + '".'
  }
}

function setExt(fname) {
  let ext = path.extname(fname);
  switch (ext) {
    case '.txt':
      setMode("text");
      break;
    case '.js':
      setMode("javascript");
      break;
    case '.ts':
      setMode("typescript");
      break;
    case '.json':
      setMode("javascript");
      break;
    case '.html':
      setMode("html");
      break;
    case '.py':
      setMode("python");
      break;
    case '.php':
      setMode("php");
      break;
  }
}

function openfile(n) {
  savefile();
  currentFname = folderItems[n];
  let fpath = path.join(folderPath, currentFname);
  fs.readFile(fpath, (err, result) => {
    if (err == null) {
      let data = result.toString();
      editor.session.getDocument().setValue(data);
      changeFlg = false;
      footer.textContent = ' "' + fpath + '" loaded.';
      setExt(currentFname);
    } else {
      dialog.showErrorBox(err.code + err.errno, err.message);
    }
  });
}

function createfile() {
  $("#save-modal").modal("show")
}

function createfileresult() {
  currentFname = document.querySelector("#input_file_name").value;
  let fpath = path.join(folderPath, currentFname);
  fs.writeFile(fpath, '', (err) => {
    editor.session.getDocument().setValue('');
    footer.textContent = '"' + currentFname + '" created.';
    changeFlag = false;
    loadPath();
  })
}

window.addEventListener("DOMContentLoaded", onLoad);
