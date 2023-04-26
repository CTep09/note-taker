const fs = require('fs')
const path = require('path');

const uuid = require('../helpers/uuid');

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
        // res.status(200).json(notes);
        res.json(`${req.method} request received to get notes`);
    })

    app.post("/api/notes", (req, res) => {
        console.info(`${req.method} request received to add a note`);

        // Destructuring assignment for the items in req.body
        const { noteTitle, noteText} = req.body;
        // req.body.product;
        // If all the required properties are present
        if (noteTitle && noteText) {
          // Variable for the object we will save
          const newNote = {
            noteTitle,
            noteText,
            uuid: uuid(),
          };
          console.log(newNote);
          fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote)
                
                // Write the string to a file
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                      writeErr
                        ? console.error(writeErr)
                        : console.info('Successfully updated notes!')
                  );
                }
              });
      
          const response = {
            status: 'success',
            body: newNote,
          };
      
          console.log(response);
          res.status(201).json(response);
        } else {
          res.status(500).json('Error in posting note');
        }
      });


    // app.delete("/api/notes/:id", (req, res) => {

    // })
}

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).