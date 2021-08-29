let editor = null;

function onLoad() {
  let editorArea = document.getElementById("editor_area");
  let footerArea = document.getElementById("footer");

  editor = ace.edit("editor_area");
  editor.setTheme("ace/theme/textmate");
  editor.session.setMode("ace/mode/text");
  editor.focus();
}

function setTheme(tname) {
  editor.setTheme("ace/theme/" + tname);
}

function setMode(mname) {
  editor.session.setMode("ace/mode/" + mname);
}

function setFontSize(n) {
  editor.setFontSize(n);
}

window.addEventListener("DOMContentLoaded", onLoad);
