require("dotenv").config();
const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

const port = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

app.use((req, _res, next) => {
  if (req.headers.origin && req.method !== "OPTIONS") {
    console.log("Origin:", req.headers.origin);
  }
  next();
});

// middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true, // allow cookies
//   })
// );

app.use(
  cors({
    origin: function (origin, callback) {
      // allow tools like curl/postman (no origin) and our dev frontends
      if (!origin || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true, // send cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => res.send("Server start"));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

connectDB().then(() => {
  app.listen(port, () => console.log(`✅ Server is running on ${port}`));
});
