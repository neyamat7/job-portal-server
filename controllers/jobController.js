const Job = require("../models/Job");

// Controller for posting a job
async function postJob(req, res) {
  console.log(req.user);
  try {
    // Step 1: Ensure the user is logged in and is an employer
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to post a job" });
    }

    // Step 2: Extract job data from the request body
    const {
      title,
      salaryRange,
      jobType,
      description,
      categories,
      jobLevel,
      remoteOrOnsite,
      freelancerCount,
    } = req.body;

    // Step 3: Basic validation
    if (
      !title ||
      !salaryRange ||
      !jobType ||
      !description ||
      !categories ||
      !jobLevel ||
      !remoteOrOnsite ||
      !freelancerCount
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step 4: Create the new job post
    const newJob = new Job({
      title,
      salaryRange,
      jobType,
      description,
      categories,
      jobLevel,
      remoteOrOnsite,
      freelancerCount,
      postedBy: req.user.sub, // Associate the job with the logged-in employer
    });

    // Step 5: Save the job post to the database
    await newJob.save();

    // Step 6: Send back a response with the created job (without password or sensitive info)
    return res.status(201).json({
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (err) {
    console.error("Error posting job:", err);
    return res
      .status(500)
      .json({ message: "Server errorrrrrrrr, please try again" });
  }
}

async function getJobsByUser(req, res) {
  try {
    // Step 1: Ensure the user is logged in
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to view jobs" });
    }

    // Step 2: Get the logged-in user's ID
    const userId = req.user.sub; // `req.user.sub` is the user ID from the JWT token

    // Step 3: Query the database to find jobs posted by the user
    const jobs = await Job.find({ postedBy: userId }) // Correct field: postedBy
      .populate("postedBy", "email"); // Populating the user details (like name, email)

    // Step 4: If no jobs are found, return a message
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this user" });
    }

    // Step 5: Return the found jobs
    return res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
}

module.exports = { postJob, getJobsByUser };
