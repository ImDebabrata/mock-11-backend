const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { signinRouter } = require("./routes/signin.route");
const { signupRouter } = require("./routes/signup.route");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to bug tracker backend");
});

// app.use(authenticate);
app.use("/login", signinRouter);
app.use("/signup", signupRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log("Listening on PORT 8080");
});
