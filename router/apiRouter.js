// Importing modules
const fs = require("fs");
const path = require("path");
const app = require("express").Router();

// Generates unique id for each note
const { v4: uuidv4 } = require("uuid");

// GET /notes should read the db.json file and return all previously saved notes
app.get("/notes", (req, res) => {
  const parsedNotes = getNotes();
  res.json(parsedNotes);
  console.info(`${req.method} loaded saved notes`);

  function getNotes() {
    const noteData = fs.readFileSync("./db/db.json", "utf-8");
    const parsedNotes = JSON.parse(noteData);

    return parsedNotes;
  }
});

// POST /notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring for the items in req.body
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable to save the new note object
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    console.log(newNote);

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        // Write the updated notes back to the db.json file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });
    
    // Send JSON response with new note and success status
    const response = {
      status: "success",
      body: newNote,
    };

    
    console.log(response);
    res.status(201).json(response);
  } else {
    // If there is an error, console log the error
    res.status(500).json("Error in posting note");
  }
});

  module.exports = app;

// app.delete("/notes/:id", (req, res) => {

// })
