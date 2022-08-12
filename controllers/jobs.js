export const getAllJobs = (req, res) => {
    let query = `SELECT * FROM job_ads ORDER BY published_at DESC;`;

    // execute query
    db.query(query, (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
}

export const getJob = (req, res) => {
    let query = `SELECT * FROM job_ads WHERE id = ?`;

    let id = req.params.id;

    db.query(query, id, (err, result) => {
        if (err) res.status(500).send(err);
        if (!result[0]) res.send("Job bot found");
        else res.send(result);
    });
}

export const addJob = (req, res) => {
    let query = `INSERT INTO job_ads
        (expires_at, start_date, company_id, title, description, location, hourly_pay, yearly_salary)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?);`;

    let {
        expires_at,
        start_date,
        company_id,
        title,
        description,
        location,
        hourly_pay,
        yearly_salary,
    } = req.body;

    // execute query
    db.query(
        query,
        [
            expires_at,
            start_date,
            company_id,
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

export const editJob = (req, res) => {
    let query = `UPDATE job_ads
      SET
        expires_at = ?,
        start_date = ?,
        company_id = ?,
        title = ?,
        description = ?,
        location = ?,
        hourly_pay = ?,
        yearly_salary = ?
      where id = ?;`;

    let {
        expires_at,
        start_date,
        company_id,
        title,
        description,
        location,
        hourly_pay,
        yearly_salary,
    } = req.body;

    let { id } = job.params;

    db.query(
        query,
        [
            expires_at,
            start_date,
            company_id,
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

export const deleteJob = (req, res) => {
    let query = `DELETE FROM job_ads WHERE id = ?`;

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
        return res.status(400).send('No files were uploaded.');
    }

    uploadedFile = req.files.uploadedFile;
    uploadPath = `public/uploads/jobs/${uuid4()}_${uploadedFile.name}`

    uploadedFile.mv(uploadPath, err => {
        if (err) {
            return res.status(500).send(`Move error: ${err}`);
        }
        res.send({ "File name": uploadedFile.name, "Upload path": uploadPath })
    })
}