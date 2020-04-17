
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
  theme: "monokai"
});


  
  fetch('/projectname', {
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(data => {
    let name = document.getElementById("project-name");
    name.value = data.name;
  });
  
