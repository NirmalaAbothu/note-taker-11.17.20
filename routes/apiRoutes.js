// required packages
const fs = require("fs");
const path = require("path");
// const resolve = require("path").resolve;
// const db = require(resolve("./db/db.json"));
// console.log(db);
// const db = require("../db/db.json");
const db = require("../db/db.json");
const router = require("express").Router();
var timeout = require("connect-timeout");
console.log("this is api routes");
const db1 = path.join(__dirname, "..", "db", "db.json");
console.log(db);
console.log(db1);
// console.log(__dirname);
// const OUTPUT_DIR = path.resolve(__dirname, "./db");
// console.log(OUTPUT_DIR);
//creating  file in output folder
// const outputPath = path.join(OUTPUT_DIR, "db.json");
// console.log(outputPath);

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

     // fs.readFile("./db/db.json", "utf8", (err, data) => {
     // fs.readFile("./db/db.json", "utf8", (err, data) => {
     req.setTimeout(50000);
     fs.readFile(
          path.join(__dirname, "..", "db", "db.json"),
          "utf8",
          (err, data) => {
               if (err) throw err;
               var dbdata = JSON.parse(data);
               dbdata.push(newNote);

               // fs.writeFileSync(
               // "${__dirname}/../db/db.json",
               // JSON.stringify(dbdata),
               // function (err) {
               // fs.writeFileSync(db, JSON.stringify(dbdata), function (err) {
               fs.writeFileSync(
                    path.join(__dirname, "..", "db", "db.json"),
                    JSON.stringify(dbdata),
                    function (err) {
                         if (err) throw err;
                         console.log(dbdata);
                         // res.send(newNote);
                         res.status(200).end();
                    }
               );
          }
     );
});

//api call to delete item from db.json file
router.delete("/notes/:id", function (req, res) {
     let idTodelete = req.params.id;
     req.setTimeout(50000);
     fs.readFile(
          path.join(__dirname, "..", "db", "db.json"),
          "utf8",
          (err, data) => {
               if (err) throw err;
               var dbdata = JSON.parse(data);
               var newNotes = dbdata.filter((note) => note.id != idTodelete);

               fs.writeFileSync(
                    path.join(__dirname, "..", "db", "db.json"),
                    JSON.stringify(newNotes),
                    function (err) {
                         if (err) throw err;
                         console.log("note deleted");
                         // res.send(db);
                         res.status(200).end();
                    }
               );
          }
     );
});

module.exports = router;
