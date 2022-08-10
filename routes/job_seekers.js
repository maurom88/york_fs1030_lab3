import express from 'express';

const router = express.Router();

router.get("/:id", (req, res) => {
  getJobSeeker(req, res)
});

router.post("/", (req, res) => {
  addJobSeeker(req, res)
});

router.put("/:id", (req, res) => {
  editJobSeeker(req, res)
});

router.delete("/:id", deleteJobSeeker);

function getJobSeeker(req, res) {
  let query = `SELECT * FROM job_seekers WHERE id = ?`;

  let id = req.params.id;

  db.query(query, id, (err, result) => {
    if (err) res.status(500).send(err);
    if (!result[0]) res.send("Job seeker bot found");
    else console.log(result);
  });
}

function addJobSeeker(req, res) {
  let query = `INSERT INTO job_seekers (first_name, last_name, date_of_birth, email) VALUES
  (?, ?, ?, ?)`;

  let { first_name, last_name, date_of_birth, email } = req.body;

  db.query(
    query,
    [first_name, last_name, date_of_birth, email],
    (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    }
  );
}

function editJobSeeker(req, res) {
  let query = `UPDATE job_seekers
    SET
      first_name = ?,
      last_name = ?,
      date_of_birth = ?,
      email = ?
    WHERE id = ?;`;

    let id = req.params.id;

    let {first_name, last_name, date_of_birth, email} = req.body
    
    db.query(query, [first_name, last_name, date_of_birth, email, id], (err, result) => {
      if (err) res.status(500).end(err);
      else res.send(result);
      console.log(result)
    })

}

function deleteJobSeeker(req, res) {
  let query = `DELETE FROM job_seekers WHERE id = ?`;

  let id = req.params.id;

db.query(query, id, (err, result) => {
    if (err) res.status(500).end(err);
    else res.send(result);
  });
}

export default router;