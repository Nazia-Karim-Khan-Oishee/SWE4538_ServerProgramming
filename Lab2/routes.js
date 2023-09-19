const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();

router.get("/getRequest", (req, res) => {
  res.send("<h1>This is a GET request</h1>");
});

router.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

router.use(bodyParser.json);
module.exports = router;
