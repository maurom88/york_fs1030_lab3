import express from 'express';
import { getAllJobs, addJob, getJob, editJob, deleteJob, imgUpload } from '../controllers/jobs.js';

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", addJob);
router.get("/:id", getJob);
router.put("/:id", editJob);
router.delete("/:id", deleteJob);
router.post("/upload", imgUpload)

export default router;
