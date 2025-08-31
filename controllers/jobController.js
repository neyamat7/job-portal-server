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



module.exports = { postJob, getJobsByUser };
