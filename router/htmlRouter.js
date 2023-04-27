const path = require('path');
const app = require('express').Router();

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '../public/notes.html'))
)

app.get('/assets/css/styles.css', (req, res) => 
res.sendFile(path.join(__dirname, '../public/assets/css/styles.css'))
)

app.get('/assets/js/index.js', (req, res) => 
res.sendFile(path.join(__dirname, '../public/assets/js/index.js'))
)

// GET * should return the index.html file.
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = (app) 
// The following HTML routes should be created:

// GET /notes should return the notes.html file.


