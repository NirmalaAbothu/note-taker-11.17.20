// required packages
const fs = require("fs");
// const path = require("path");
const resolve = require("path").resolve;
const db = require(resolve("./db/db.json"));
console.log(db);
// const db = require("../db/db.json");
const router = require("express").Router();
console.log("this is api routes");
// console.log(__dirname);

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
     // console.log(__dirname);
     // console.log(__filename);
     let newNote = {
          id: Math.floor(Math.random() * 100),
          title: req.body.title,
          text: req.body.text,
     };

     //read db.json file
     console.log("hi this is _dirname");
     console.log(__dirname);
     console.log(__filename);
     console.log("./db/db.json");
     // fs.readFile("./db/db.json", "utf8", (err, data) => {
     // fs.readFile(db, "utf8", (err, data) => {
     fs.readFile(`${__dirname}/../db/db.json`, "utf8", (err, data) => {
          if (err) throw err;
          var dbdata = JSON.parse(data);
          dbdata.push(newNote);

          fs.writeFileSync(
               "${__dirname}/../db/db.json",
               JSON.stringify(dbdata),
               function (err) {
                    // fs.writeFileSync(db, JSON.stringify(dbdata), function (err) {
                    // fs.writeFileSync(db, JSON.stringify(dbdata), function (err) {
                    if (err) throw err;
                    console.log(dbdata);
                    res.send(newNote);
               }
          );
     });
});

//api call to delete item from db.json file
router.delete("/notes/:id", function (req, res) {
     let idTodelete = req.params.id;
     fs.readFile(`${__dirname}/../db/db.json`, "utf8", (err, data) => {
          if (err) throw err;
          var dbdata = JSON.parse(data);
          var newNotes = dbdata.filter((note) => note.id != idTodelete);

          fs.writeFileSync(
               "${__dirname}/../db/db.json",
               JSON.stringify(newNotes),
               function (err) {
                    if (err) throw err;
                    console.log("note deleted");
                    res.send(db);
               }
          );
     });
});
module.exports = router;
