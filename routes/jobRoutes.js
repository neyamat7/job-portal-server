const express = require("express");
const {
  postJob,
  getJobsByUser,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { requireAuth } = require("../utils/requireAuth"); // Ensure the user is logged in

const router = express.Router();

// Route to post a job (only for logged-in users)
router.post("/post", requireAuth, postJob); // Protected route
router.get("/user", requireAuth, getJobsByUser); // Protected route
router.patch("/:id", requireAuth, updateJob);
router.delete("delete/:id", requireAuth, deleteJob);

module.exports = router;
