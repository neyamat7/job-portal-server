const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xrpsmxy.mongodb.net/jobportalDB?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

async function connectDB() {
  try {
    // Connect with Mongoose
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ MongoDB connected with Mongoose");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// function getDB() {
//   return client.db("job_portal_DB");
// }

module.exports = { connectDB, mongoose };
