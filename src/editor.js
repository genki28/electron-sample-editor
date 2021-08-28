let editor = null;

function onLoad() {
  editor = ace.edit("editor_area");
  editor.focus();
}

window.addEventListener("DOMContentLoaded", onLoad);
