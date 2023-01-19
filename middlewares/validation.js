const validation = (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res
      .status(400)
      .json({ response: "Email and password are required." });
  }
  next();
};

module.exports = { validation };
