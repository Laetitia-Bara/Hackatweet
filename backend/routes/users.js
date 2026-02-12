const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

// POST /users/signup
router.post("/signup", async (req, res) => {
  try {
    const { firstname, username, password } = req.body;

    if (!firstname || !username || !password) {
      return res.json({ result: false, error: "Missing fields" });
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });
    if (existingUser) {
      return res.json({ result: false, error: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      firstname,
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      result: true,
      token,
      user: { firstname: newUser.firstname, username: newUser.username },
    });
  } catch (e) {
    res.json({ result: false, error: "Server error" });
  }
});

// POST /users/signin
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ result: false, error: "Missing fields" });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) {
      return res.json({ result: false, error: "Wrong username or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      result: true,
      token,
      user: { firstname: user.firstname, username: user.username },
    });
  } catch (e) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
