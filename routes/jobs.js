function getAllJobs(req, res) {
  let query = `select * from job_ads order by published_at desc;`;

  // execute query
  db.query(query, (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
}

function getJob(req, res) {
  let query = `select * from job_ads where id = ?`;

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
  let query = `update job_ads
    set
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
  let query = `delete from job_ads where id = ?`;

  let id = req.params.id;

db.query(query, id, (err, result) => {
    if (err) res.status(500).end(err);
    else res.send(result);
  });
}

module.exports = {
  getAllJobs,
  getJob,
  addJob,
  editJob,
  deleteJob,
};
