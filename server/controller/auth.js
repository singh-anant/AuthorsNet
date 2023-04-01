const db = require("../model/db");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let register = (req, res) => {
  // CHECK THE EXISTING USER
  const q = "SELECT * FROM users WHERE email=? OR username=?";
  db.query(q, [req.body.email, req.body.username], (error, data) => {
    if (error) res.json(error);
    // if there a data
    if (data.length) return res.status(409).json("The user already exist!!");

    // HASHED PASSWORD and CREATE A USER
    // Store hash in your password DB.
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (error, data) => {
      if (error) return res.status(400).json(error);
      return res.status(200).json("USER REGISTERED");
    });
  });
};

let login = (req, res) => {
  // Cheking user existence
  const q = "SELECT * FROM users WHERE username=?";
  db.query(q, [req.body.username], (error, data) => {
    if (error) return res.json(error);
    if (data.length === 0) return res.status(404).json("User not found!!");

    // Checking the password
    // Need to compare passwords...ie hashed
    const isCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isCorrect) return res.status(400).json("Wrong username and password");
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

module.exports = { register, login, logout };
