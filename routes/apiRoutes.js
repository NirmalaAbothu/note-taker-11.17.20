// required packages
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const router = require("express").Router();
console.log("this is api routes");

//api call to display notes from db.json
router.get("/notes", function (req, res) {
     console.log(db);
     var count = Object.keys(db).length;
     console.log(count);
     if (count == 0)
          res.send("<html><body><h1>No Saved Notes </h1></body></html>");
     else res.json(db);
});

//api call to save the data to db.json file
router.post("/notes", function (req, res) {
     console.log("hi this is post");
     let newNote = {
          id: Math.floor(Math.random() * 100),
          title: req.body.title,
          text: req.body.text,
     };

     //read db.json file
     fs.readFile("./db/db.json", "utf8", (err, data) => {
          if (err) throw err;
          var dbdata = JSON.parse(data);
          dbdata.push(newNote);

          fs.writeFileSync("./db/db.json", JSON.stringify(dbdata), function (
               err
          ) {
               if (err) throw err;
               console.log(dbdata);
               res.send(newNote);
          });
     });
});

//api call to delete item from db.json file
router.delete("/notes/:id", function (req, res) {
     let idTodelete = req.params.id;
     fs.readFile("./db/db.json", "utf8", (err, data) => {
          if (err) throw err;
          var dbdata = JSON.parse(data);
          var newNotes = dbdata.filter((note) => note.id != idTodelete);

          fs.writeFileSync("./db/db.json", JSON.stringify(newNotes), function (
               err
          ) {
               if (err) throw err;
               console.log("note deleted");
               res.send(db);
          });
     });
});
module.exports = router;
