// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var randomize = require('randomatic');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const endb = require('endb');
var user = new endb("sqlite://user.db");

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

app.get("/signup", (request, response) => {
  response.sendFile(__dirname + "/views/signup.html");
});

app.get("/projectname", (req, res) => {
  let name = randomize('Aa0', 10);
  let data = { name: name };
  res.send(data);
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
