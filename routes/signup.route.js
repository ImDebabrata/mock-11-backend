const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userPresent = await UserModel.findOne({ email });
  if (userPresent?.email) {
    res.send({ response: "Try loggin in, already exist" });
  } else {
    try {
      bcrypt.hash(password, 4, async function (err, hash) {
        const user = new UserModel({ email, password: hash });
        await user.save();
        res.send({ response: "Sign up successfull" });
      });
    } catch (err) {
      console.log(err);
      res.send({ response: "Something went wrong, pls try again later" });
    }
  }
});

module.exports = { signupRouter };
