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


async function getAllJobs(req, res) {
  try {
    // Step 1: Ensure the user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in to view the jobs" });
    }

    // Step 2: Fetch all jobs from the database
    const jobs = await Job.find();  // No filter, just fetch all jobs

    // Step 3: If no jobs found, return a message
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs available" });
    }

    // Step 4: Return the jobs
    return res.status(200).json({ jobs });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error, please try again" });
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

async function updateJob(req, res) {
  try {
    // Step 1: Ensure the user is logged in
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to update a job" });
    }

    // Step 2: Get the job ID from the request params
    const jobId = req.params.id;

    // Step 3: Find the job in the database
    const job = await Job.findById(jobId);

    // Step 4: Check if the job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Step 5: Check if the logged-in user is the owner of the job
    if (job.postedBy.toString() !== req.user.sub) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job" });
    }

    // Step 6: Update the job details from the request body
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

    job.title = title || job.title;
    job.salaryRange = salaryRange || job.salaryRange;
    job.jobType = jobType || job.jobType;
    job.description = description || job.description;
    job.categories = categories || job.categories;
    job.jobLevel = jobLevel || job.jobLevel;
    job.remoteOrOnsite = remoteOrOnsite || job.remoteOrOnsite;
    job.freelancerCount = freelancerCount || job.freelancerCount;

    // Step 7: Save the updated job
    await job.save();

    // Step 8: Return the updated job
    return res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
}

async function deleteJob(req, res) {
  try {
    // Step 1: Ensure the user is logged in
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "You must be logged in to delete a job" });
    }

    // Step 2: Get the job ID from the request params
    const jobId = req.params.id;

    // Step 3: Find the job in the database
    const job = await Job.findById(jobId);

    // Step 4: Check if the job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Step 5: Ensure the logged-in user is the owner of the job
    if (job.postedBy.toString() !== req.user.sub) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }

    // Step 6: Delete the job
    await Job.findByIdAndDelete(jobId); 

    // Step 7: Send success response
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
}

module.exports = { postJob, getAllJobs, getJobsByUser, updateJob, deleteJob };
