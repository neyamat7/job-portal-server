const express = require("express");
const {
  postJob,
  getJobsByUser,
  updateJob,
  deleteJob,
  getAllJobs,
} = require("../controllers/jobController");
const { requireAuth } = require("../utils/requireAuth"); // Ensure the user is logged in

const router = express.Router();

// Route to post a job (only for logged-in users)
router.post("/post", requireAuth, postJob);  
router.get("/user", requireAuth, getJobsByUser);
router.get("/all", requireAuth, getAllJobs); 
router.patch("/:id", requireAuth, updateJob);
router.delete("/delete/:id", requireAuth, deleteJob);

module.exports = router;
