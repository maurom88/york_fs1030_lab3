function getJobSeeker(req, res) {
  let query = `select * from job_seekers where id = ?`;

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
  let query = `update job_seekers
    set
      first_name = ?,
      last_name = ?,
      date_of_birth = ?,
      email = ?
    where id = ?;`;

    let id = req.params.id;

    let {first_name, last_name, date_of_birth, email} = req.body
    
    db.query(query, [first_name, last_name, date_of_birth, email, id], (err, result) => {
      if (err) res.status(500).end(err);
      else res.send(result);
      console.log(result)
    })

}

function deleteJobSeeker(req, res) {}

module.exports = {
  getJobSeeker,
  addJobSeeker,
  editJobSeeker,
  deleteJobSeeker,
};

// const fs = require('fs');
// const { builtinModules } = require('module');

// module.exports = {
//     addPlayer: (req, res) => {
//         if (!req.files) {
//             return res.status(400).send("No files were uploaded.");
//         }

//         let message = '';
//         let first_name = req.body.first_name;
//         let last_name = req.body.last_name;
//         let position = req.body.position;
//         let number = req.body.number;
//         let username = req.body.username;
//         let uploadedFile = req.files.image;
//         let image_name = uploadedFile.name;
//         let fileExtension = uploadedFile.mimetype.split('/')[1];
//         image_name = username + '.' + fileExtension;

//         let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

//         db.query(usernameQuery, (err, result) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             if (result.length > 0) {
//                 message = 'Username already exists';
//                 res.send(message)
//             } else {
//                 // check the filetype before uploading it
//                 if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
//                     // upload the file to the /public/assets/img directory
//                     uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
//                         if (err) {
//                             return res.status(500).send(err);
//                         }
//                         // send the player's details to the database
//                         let query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
//                             first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
//                         db.query(query, (err, result) => {
//                             if (err) {
//                                 return res.status(500).send(err);
//                             }
//                             res.redirect('/');
//                         });
//                     });
//                 } else {
//                     message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
//                     res.send(message)
//                 }
//             }
//         });
//     },
//     editPlayerPage: (req, res) => {
//         let playerId = req.params.id;
//         let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
//         db.query(query, (err, result) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             res.render('edit-player.ejs', {
//                 title: "Edit  Player"
//                 ,player: result[0]
//                 ,message: ''
//             });
//         });
//     },
//     editPlayer: (req, res) => {
//         let playerId = req.params.id;
//         let first_name = req.body.first_name;
//         let last_name = req.body.last_name;
//         let position = req.body.position;
//         let number = req.body.number;

//         let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
//         db.query(query, (err, result) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             res.redirect('/');
//         });
//     },
//     deletePlayer: (req, res) => {
//         let playerId = req.params.id;
//         let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
//         let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

//         db.query(getImageQuery, (err, result) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }

//             let image = result[0].image;

//             fs.unlink(`public/assets/img/${image}`, (err) => {
//                 if (err) {
//                     return res.status(500).send(err);
//                 }
//                 db.query(deleteUserQuery, (err, result) => {
//                     if (err) {
//                         return res.status(500).send(err);
//                     }
//                     res.redirect('/');
//                 });
//             });
//         });
//     }
// };
