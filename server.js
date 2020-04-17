// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var randomize = require("randomatic");
var session = require("express-session");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const endb = require("endb");
var user = new endb("sqlite://user.db");

app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

// app.get("/login", (request, response) => {
//   response.sendFile(__dirname + "/views/login.html");
// });

app.get("/signup", (request, response) => {
  var email = request.body.username;
  var username = request.body.username;
  var passowrd = request.body.username;
  if (username && password )
});

app.get("/projectname", (req, res) => {
  let name = randomize("Aa0", 10);
  let data = { name: name };
  res.send(data);
});

app.post("/auth", async function(request, response) {
  var authdata;
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    let hasuser = await user.has(username);
    if (hasuser) {
      let pass = await endb.get(username);
      if (pass === password) {
        request.session.loggedin = true;
        request.session.username = username;
        authdata = { redirect: "editor" };
        response.send(authdata);
        // response.redirect("/editor");
      } else {
        // response.send("Incorrect Username and/or Password!");
        authdata = { redirect: "/" };
        response.send(authdata);
      }
      response.end();
    } else {
      // esponse.redirect('/signup');
      authdata = { redirect: "signup" };
      response.send(authdata);
    }
  }
});

app.get('/editor', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(__dirname + "/views/editor.html");
	} else {
		response.redirect("/");
	}
	response.end();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
