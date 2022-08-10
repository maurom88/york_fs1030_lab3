import express from 'express';

const router = express.Router();

router.get("/", getAllJobs);

router.get("/:id", (req, res) => {
  getJob(req, res);
});

router.post("/new", (req, res) => {
  addJob(req.body, res);
});

router.put("/:id", (req, res) => {
  editJob(req, res);
});

router.delete("/:id", (req, res) => {
  deleteJob(req, res);
});

function getAllJobs(req, res) {
  let query = `SELECT * FROM job_ads ORDER BY published_at DESC;`;

  // execute query
  db.query(query, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
}

function getJob(req, res) {
  let query = `SELECT * FROM job_ads WHERE id = ?`;

  let id = req.params.id;

  db.query(query, id, (err, result) => {
    if (err) res.status(500).send(err);
    if (!result[0]) res.send("Job bot found");
    else res.send(result);
  });
}

function addJob(newJob, res) {
  let query = `INSERT INTO job_ads
      (expires_at, start_date, company_id, job_id, title, \`description\`, location, hourly_pay, yearly_salary)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  let {
    expires_at,
    start_date,
    company_id,
    job_id,
    title,
    description,
    location,
    hourly_pay,
    yearly_salary,
  } = newJob;

  // execute query
  db.query(
    query,
    [
      expires_at,
      start_date,
      company_id,
      job_id,
      title,
      description,
      location,
      hourly_pay,
      yearly_salary,
    ],
    (err, result) => {
      if (err) res.send(err);
      res.send(result);
    }
  );
}

function editJob(job, res) {
  let query = `UPDATE job_ads
    SET
      expires_at = ?,
      start_date = ?,
      company_id = ?,
      job_id = ?,
      title = ?,
      \`description\` =?,
      location = ?,
      hourly_pay = ?,
      yearly_salary = ?
    where id = ?;`;

  let {
    expires_at,
    start_date,
    company_id,
    job_id,
    title,
    description,
    location,
    hourly_pay,
    yearly_salary,
  } = job.body;

  let { id } = job.params;

  db.query(
    query,
    [
      expires_at,
      start_date,
      company_id,
      job_id,
      title,
      description,
      location,
      hourly_pay,
      yearly_salary,
      id,
    ],
    (err, result) => {
      if (err) res.send(err);
      else res.status(200).send(result);
    }
  );
}

function deleteJob(req, res) {
  let query = `DELETE FROM job_ads WHERE id = ?`;

  let id = req.params.id;

db.query(query, id, (err, result) => {
    if (err) res.status(500).end(err);
    else res.send(result);
  });
}

export default router;
