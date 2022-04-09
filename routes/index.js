function getHomePage(req, res) {
  let query = "select * from job_ads order by published_at desc;";

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
}

module.exports = {
  getHomePage,
};
