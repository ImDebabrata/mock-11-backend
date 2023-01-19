const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
const signinRouter = express.Router();

signinRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.find({ email });
  if (user.length > 0) {
    try {
      const hashed_password = user[0].password;
      bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "hush");
          res.send({ response: "Login successfull", token: token });
        } else {
          res.send({ response: "Login failed" });
        }
      });
    } catch (err) {
      console.log(err);
      res.send({ response: "Something went wrong, please try again later" });
    }
  } else {
    res.send({ response: "Login failed" });
  }
});

module.exports = { signinRouter };
