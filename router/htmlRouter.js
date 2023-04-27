// Importing modules
const path = require("path");
const app = require("express").Router();


// Get route for /notes server will respond with sending notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);
// Get route for style.css so style will render correctly on the page
app.get("/assets/css/styles.css", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"))
);
// Get route for index.js for proper functioning of website
app.get("/assets/js/index.js", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/assets/js/index.js"))
);

// GET * should return the index.html file.
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// Exporting router
module.exports = app;

