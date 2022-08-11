import uuid4 from "uuid4";

export const addJobSeeker = (req, res) => {
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

export const getJobSeeker = (req, res) => {
    let query = `SELECT * FROM job_seekers WHERE id = ?`;

    let id = req.params.id;

    db.query(query, id, (err, result) => {
        if (err) res.status(500).send(err);
        if (!result[0]) res.send("Job seeker not found");
        else res.send(result);
    });
}

export const editJobSeeker = (req, res) => {
    let query = `UPDATE job_seekers
      SET
        first_name = ?,
        last_name = ?,
        date_of_birth = ?,
        email = ?
      WHERE id = ?;`;

    let id = req.params.id;

    let { first_name, last_name, date_of_birth, email } = req.body

    db.query(query, [first_name, last_name, date_of_birth, email, id], (err, result) => {
        if (err) res.status(500).end(err);
        else res.send(result);
    })

}

export const deleteJobSeeker = (req, res) => {
    let query = `DELETE FROM job_seekers WHERE id = ?`;

    let id = req.params.id;

    db.query(query, id, (err, result) => {
        if (err) res.status(500).end(err);
        else res.send(result);
    });
}

export const imgUpload = (req, res) => {
    let uploadedFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log(req.files)
        return res.status(400).send('No files were uploaded.');
    }

    console.log(req.files);
    uploadedFile = req.files.uploadedFile;
    uploadPath = `public/uploads/${uuid4()}_${uploadedFile.name}`

    uploadedFile.mv(uploadPath, err => {
        if (err) {
            return res.status(500).send(`Move error: ${err}`);
        }
        res.json({ "File name": uploadedFile.name, "Upload path": uploadPath })
    })
}