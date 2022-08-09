const express = require("express");
// const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const app = express();
const cors = require('cors')
require('dotenv').config();

const {
  getAllJobs,
  getJob,
  addJob,
  editJob,
  deleteJob,
} = require("./routes/jobs");
const {
  getJobSeeker,
  addJobSeeker,
  editJobSeeker,
  deleteJobSeeker,
} = require("./routes/job_seekers");

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});
global.db = db;

// configure middleware
app.set("port", process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload
app.use(cors())

// routes for jobs

app.get("/jobs", getAllJobs);

app.get("/jobs/:id", (req, res) => {
  getJob(req, res);
});

app.post("/jobs/new", (req, res) => {
  addJob(req.body, res);
});

app.put("/jobs/:id", (req, res) => {
  editJob(req, res);
});

app.delete("/jobs/:id", (req, res) => {
  deleteJob(req, res);
});

// routes for job seekers

app.get("/job_seeker/:id", (req, res) => {
  getJobSeeker(req, res)
});

app.post("/job_seeker", (req, res) => {
  addJobSeeker(req, res)
});

app.put("/job_seeker/:id", (req, res) => {
  editJobSeeker(req, res)
});

app.delete("/job_seeker/:id", deleteJobSeeker);

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Set the app to listen on the port
app.listen(process.env.port, () => {
  console.log(`Server running on port: ${process.env.port}`);
});
