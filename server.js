require("dotenv").config();
const express = require("express");

const cors = require("cors");
const { connectDB } = require("./db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server start"));

// Mount routes
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(port, () => console.log(`✅ Server is running on ${port}`));
});
