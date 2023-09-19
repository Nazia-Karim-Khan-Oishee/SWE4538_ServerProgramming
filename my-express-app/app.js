const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/hello", (req, res) => {
  // res.send("Hello ");
  const filepath = path.join(__dirname, "helloworld.html");
  res.sendFile(filepath);
  // res.sendFile("E:/my-express-app/helloworld.html");
});
app.get("/world", (req, res) => {
  res.send("World!");
});

app.get("/home", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Welcome, ${username}`);
});
