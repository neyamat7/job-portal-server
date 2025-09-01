const mongoose = require("mongoose");

// Create a schema for the job post
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },  
    datePosted: { type: Date, default: Date.now },  
    salaryRange: { type: String, required: true },  
    jobType: { type: String, required: true },  
    description: { type: String, required: true },  
    categories: [{ type: String }],  
    jobLevel: {
      type: String,
      enum: ["Junior", "Mid", "Senior"],
      required: true,
    },  
    remoteOrOnsite: {
      type: String,
      enum: ["Remote", "Onsite"],
      required: true,
    },  
    freelancerCount: { type: Number, required: true },  
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },  
  },
  { timestamps: true }
);

// Create the Job model
module.exports = mongoose.model("Job", jobSchema);
