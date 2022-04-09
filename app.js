const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const app = express();

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
} = require("./routes/player");
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
  host: "localhost",
  user: "nodeclient",
  password: "123456",
  database: "job_board",
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
app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

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

app.get("/job_seeker/:id", getJobSeeker);
app.post("/job_seeker", addJobSeeker);
app.put("/edit/:id", editJobSeeker);
app.delete("/delete/:id", deleteJobSeeker);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
