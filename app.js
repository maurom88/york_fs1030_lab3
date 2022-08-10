import express from 'express';
import bodyParser from 'body-parser';
import jobSeekersRoutes from './routes/job_seekers.js'
import jobsRoutes from './routes/jobs.js'

// const fileUpload = require("express-fileupload");
// import path from 'path';
import mysql2 from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.port || 5000;

// configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use('/job_seekers', jobSeekersRoutes);
app.use('/jobs', jobsRoutes);
app.use(cors())
// app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
// app.use(fileUpload()); // configure fileupload

// create connection to database
// the mysql2.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql2.createConnection({
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

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

// Set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${process.env.port}`);
});
