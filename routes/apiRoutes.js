// required packages
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const router = require("express").Router();
console.log("this is api routes");
const jsondb = require("../db/db");
router.get("/notes", function (req, res) {
     console.log(db);
     var count = Object.keys(db).length;
     console.log(count);
     if (count == 0)
          res.send("<html><body><h1>No Saved Notes </h1></body></html>");
     else res.json(jsondb);
});

//api call to add notes

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
});

module.exports = router;
