var path = require("path");
const router = require("express").Router();

router.get("/notes", function (req, res) {
     // console.log(__dirname);
     res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Basic route that sends the user first to the AJAX Page
router.get("/", function (req, res) {
     res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
