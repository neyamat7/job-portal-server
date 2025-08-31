const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  me,
  refreshAccessToken,
} = require("../controllers/authController");
const { requireAuth } = require("../utils/requireAuth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", requireAuth, me);

module.exports = router;
