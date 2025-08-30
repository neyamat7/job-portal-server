require("dotenv").config();
const express = require("express");

const cors = require("cors");
const { connectDB, getDB } = require("./db");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server start"));

app.listen(port, () => console.log(`Server is running on ${port}`));
