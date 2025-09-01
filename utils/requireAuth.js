const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    // Verify the token using the secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Attach the user payload to the request object
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
