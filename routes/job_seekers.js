import express from 'express';
import { addJobSeeker, getJobSeeker, editJobSeeker, deleteJobSeeker, imgUpload } from '../controllers/job_seekers.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/", addJobSeeker);
router.get("/:id", getJobSeeker);
router.patch("/:id", editJobSeeker);
router.delete("/:id", deleteJobSeeker);
router.post("/imgUpload", imgUpload)

export default router;