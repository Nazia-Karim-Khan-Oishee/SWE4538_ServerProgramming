const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../config/passport");
const fs = require("fs");

let users = []; // store the user info here
const USER_DATA_FILE = path.join(__dirname, "../user_data.json");

try {
  const data = fs.readFileSync(USER_DATA_FILE);
  users = JSON.parse(data);
} catch (err) {}
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/register",
    failureFlash: true,
  })(req, res, next);
};

const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
  try {
    const MIN_PASSWORD_LENGTH = 6;

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (req.body.password) {
      // Check if req.body.password is strong enough
      if (
        req.body.password.length < MIN_PASSWORD_LENGTH ||
        !passwordRegex.test(req.body.password)
      ) {
        const errorMessage =
          "Password must be at least 6 characters long and strong enough.";
        console.error(errorMessage);
        return res.status(400).json({ error: errorMessage });
      }
    } else {
      // Check if req.body.password exists
      const errorMessage = "Password must exist.";
      console.error(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(users, null, 2));
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
