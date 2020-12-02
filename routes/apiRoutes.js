// required packages
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const router = require("express").Router();
// var timeout = require("connect-timeout");
console.log("this is api routes");
// const db1 = path.join(__dirname, "..", "db", "db.json");
// const path = require("path");
// console.log(db);
// console.log(db1);
const jsondb = require("../db/db");
router.get("/notes", function (req, res) {
     console.log(db);
     var count = Object.keys(db).length;
     console.log(count);
     if (count == 0)
          res.send("<html><body><h1>No Saved Notes </h1></body></html>");
     else res.json(jsondb);
});

//new

router.post("/notes", function (req, res) {
     let newNote = {
          id: Math.floor(Math.random() * 100),
          title: req.body.title,
          text: req.body.text,
     };
     jsondb.push(newNote);
     fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify(jsondb, null, 2),
          (err) => {
               if (err) throw err;
          }
     );
     res.json(newNote);
});

//api call to save the data to db.json file
// router.post("/notes", function (req, res) {
//      console.log("hi this is post");
//      var dbdata;
//      console.log(__dirname);
//      console.log(__dirname, "../db/db.json");
//      let newNote = {
//           id: Math.floor(Math.random() * 100),
//           title: req.body.title,
//           text: req.body.text,
//      };
//      console.log("outside");
//      fs.readFile("./db/db.json", "utf8", (err, data) => {
//           if (err) throw err;
//           else {
//                console.log("1");
//                dbdata = JSON.parse(data);
//                dbdata.push(newNote);
//           }
//           console.log("2");
//           fs.writeFileSync(
//                "./db/db.json",
//                JSON.stringify(dbdata),
//                function (err) {
//                     if (err) throw err;
//                     else {
//                          console.log("3");
//                          console.log(dbdata);

//                          res.status(200).end();
//                     }
//                }
//           );
//      });
// });

//api call to delete item from db.json file
router.delete("/notes/:id", function (req, res) {
     console.log("before1 delete");
     let idTodelete = req.params.id;
     var count = Object.keys(db).length;
     console.log(count);
     console.log(idTodelete);
     for (var i = 0; i < count; i++) {
          console.log("before delete");
          console.log(db[i].id);
          if (db[i].id == idTodelete) {
               db.splice(i, 1);
               console.log(count);
               console.log(db);
               console.log("inside delete");
          }
     }
     fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify(jsondb, null, 2),
          (err) => {
               if (err) throw err;
          }
     );
     res.json(idTodelete);

     // fs.readFile("./db/db.json", "utf8", (err, data) => {
     //      if (err) throw err;
     //      var dbdata = JSON.parse(data);
     //      var newNotes = dbdata.filter((note) => note.id != idTodelete);

     //      fs.writeFileSync(
     //           "./db/db.json",
     //           JSON.stringify(newNotes),
     //           function (err) {
     //                if (err) throw err;
     //                console.log("note deleted");

     //                res.status(200).end();
     //           }
     //      );
     // });
});

module.exports = router;
