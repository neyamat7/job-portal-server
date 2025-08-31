const jwt = require("jsonwebtoken");
const COOKIE_NAME = process.env.COOKIE_NAME

exports.requireAuth = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, email, role, iat, exp }
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
