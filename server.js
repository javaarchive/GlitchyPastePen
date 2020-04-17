// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var randomize = require("randomatic");
var session = require("express-session");

const fs = require("fs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const endb = require("endb");
var user = new endb("sqlite://user.db");
var project = new endb("sqlite://project.db");

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", async (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

// app.get("/login", (request, response) => {
//   response.sendFile(__dirname + "/views/login.html");
// });

app.get("/signup", async (request, response) => {
  response.sendFile(__dirname + "/views/signup.html");
});

app.post("/signup", async (request, response) => {
  var authdata;
  global.email = request.body.username;
  var username = request.body.username;
  var password = request.body.password;
  if (username && password && global.email) {
    let hasuser = await user.has(username);
    if (!hasuser) {
      let userinfo = { password: password, email: global.email, projects: [] };
      let newuser = await user.set(username, userinfo);
      authdata = { redirect: "/", detail: "newuser" };
      response.send(authdata);
    } else {
    }
  }
});

app.get("/projectname", (req, res) => {
  let name = randomize("Aa0", 10);
  let data = { name: name };
  res.send(data);
});

app.post("/auth", async function(request, response) {
  var authdata;
  global.username = request.body.username;
  global.password = request.body.password;
  if (global.username && global.password) {
    let hasuser = await user.has(global.username);
    if (hasuser) {
      let pass = await user.get(global.username);
      console.log(pass.projects);
      pass = pass.password;
      console.log(pass);
      console.log(global.password);
      if (pass === global.password) {
        request.session.loggedin = true;
        request.session.username = global.username;
        global.theuser = request.session.username;
        authdata = { redirect: "editor", detail: "loggedin", user: global.username };
        response.send(authdata);
        // response.redirect("/editor");
      } else {
        // response.send("Incorrect Username and/or Password!");
        authdata = { redirect: "/", detail: "wronginfo" };
        response.send(authdata);
      }
      response.end();
    } else {
      // esponse.redirect('/signup');
      authdata = { redirect: "signup", detail: "noaccount" };
      response.send(authdata);
    }
  }
});

app.get("/editor", function(request, response) {
  if (request.session.loggedin) {
    response.sendFile(__dirname + "/views/editor.html");
    console.log(global.theuser);
  } else {
    response.redirect("/");
  }
});

app.get("/edit/:project", async function(request, response) {
  let hasproject = await project.has(request.params.project);
  if (!hasproject) {
    
  }
}) 

app.post("/deploy", async function(request, response) {
  let projectname = request.body.name;
  let filename = request.body.name + ".html";
  fs.writeFile(filename, request.body.code, function(err) {
    if (err) throw err;
  });
  let projectinfo = { name: projectname, owner: global.theuser };
  let setinfo = await project.set(projectname, projectinfo);
  let userinfo = await user.get(global.theuser);
  let projects = userinfo.projects;
  let newprojects = projects.push(request.body.name);
  let userobj = { password: global.password, email: global.email, projects: projects }
  console.log("New projects:")
  console.log(projects);
  response.send({ status: 200 });
});

app.get("/p/:project", function(req, res) {
  let projectname = req.params.project;
  res.sendFile(__dirname + "/" + projectname + ".html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
