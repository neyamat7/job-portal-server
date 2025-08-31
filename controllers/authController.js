// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const COOKIE_NAME = process.env.COOKIE_NAME;

async function registerUser(req, res) {
  try {
    let { email, password } = req.body;

    // Simple required checks
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    // // Normalize
    // email = String(email).toLowerCase().trim();
    // if (!name || !String(name).trim()) {
    //   // derive a simple name from email before '@'
    //   name = email.split("@")[0];
    // }

    // Check duplicate
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already used" });
    }

    // Create user (password will be hashed by the pre-save hook)
    const user = await User.create({ email, password });

    // Prepare safe response (hide password)
    const safeUser = {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };

    return res.status(201).json({ user: safeUser });
  } catch (err) {
    // Handle duplicate key (unique email) edge case
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already used" });
    }
    console.error("Register error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(400).json({ message: "Invalid email or password" });

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role || "user",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 min
      path: "/",
    });

    res.json({
      ok: true,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function logoutUser(_req, res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.json({ ok: true });
}

async function me(req, res) {
  res.json({ ok: true, user: req.user });
}

module.exports = { registerUser, loginUser, logoutUser, me };
