const createEditor = (editor, options = {}) => {
  const e = new document.CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    viewportMargin: Infinity,
    ...options
  });
  return e;
};

document.CodeMirror = CodeMirror;
var editor = createEditor(document.getElementById("editor"), {
  mode: "javascript",
  theme: "ayu-mirage"
});
