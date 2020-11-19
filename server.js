// Dependencies
// =============================================================
var express = require("express");
// require("./routes/html-routes")(app);
const htmlRoutes = require("./routes/html-routes");

const apiRoutes = require("./routes/apiRoutes");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Routes
// =============================================================
// require("./routes/html-routes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
     console.log(__dirname);
     console.log("App listening on PORT " + PORT);
});
