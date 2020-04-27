const createEditor = (editor, options = {}) => {
  const e = new document.CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    viewportMargin: Infinity,
    ...options
  });
  return e;
};

document.getElementById("status").onclick = function() {
  this.style.dislay = "none";
}

// fetch("/projectname", {
//   headers: { "Content-Type": "application/json" }
// })
//   .then(response => response.json())
//   .then(data => {
//     let name = document.getElementById("project-name");
//     name.value = data.name;
//   });

console.log(":)");

