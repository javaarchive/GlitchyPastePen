const signup = () => {
  let username = document.getElementsByClassName("username")[0].value;
  let password = document.getElementsByClassName("password")[0].value;
  let email = document.getElementsByClassName("email")[0].value;
  let content = { username: username, password: password, email: email };
  fetch("/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(content)
  })
    .then(response => response.json())
    .then(data => {
      if (data.redirect == "signup") {
        window.location.href = "https://small-glitch.glitch.me/signup";
      } else if (data.redirect == "editor") {
        window.location.href = "https://small-glitch.glitch.me/editor";
      } else if (data.redirect == "/") {
        window.location.href = "https://small-glitch.glitch.me/";
      } else {
        console.log("yo!");
      }
    });
};
