const mongoose = require("mongoose");

// Create a schema for the job post
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Job title (e.g., "Website Design")
    datePosted: { type: Date, default: Date.now }, // Date the job is posted
    salaryRange: { type: String, required: true }, // Salary range (e.g., "$1,200 - $1,400")
    jobType: { type: String, required: true }, // Job type (e.g., "Fixed Price Project")
    description: { type: String, required: true }, // Job description (detailed explanation)
    categories: [{ type: String }], // Categories (e.g., "App Design", "Art Generation")
    jobLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    }, // Job level (e.g., "Junior", "Mid", "Senior")
    remoteOrOnsite: {
      type: String,
      enum: ["Remote", "Onsite"],
      required: true,
    }, // Job type (Remote or Onsite)
    freelancerCount: { type: Number, required: true }, // Number of freelancers required
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to user (employer)
  },
  { timestamps: true }
);

// Create the Job model
module.exports = mongoose.model("Job", jobSchema);
