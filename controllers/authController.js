// controllers/authController.js
const User = require("../models/User");

async function registerUser(req, res) {
  try {
    let { email, password } = req.body;

    // Simple required checks
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
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

module.exports = { registerUser };
