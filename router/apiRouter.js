const fs = require('fs')
const path = require('path');

const { v4: uuidv4 } = require('uuid');
// const db = require('../db/db.json');


module.exports = (app) => {
  
  app.get("/api/notes", (req, res) => {
    const parsedNotes = getNotes();
    res.json(parsedNotes);
    console.info(`${req.method} loaded saved notes`)
    
    const getNotes = function(){
      const noteData = fs.readFileSync('./db/db.json', 'utf-8');
      const parsedNotes = JSON.parse(noteData);
    
      return parsedNotes;
    } 
      // res.status(200).json(notes);
        // res.sendFile(db);

    });

    app.post("/api/notes", (req, res) => {
        console.info(`${req.method} request received to add a note`);

        // Destructuring assignment for the items in req.body
        const { title, text} = req.body;
        // req.body.product;
        // If all the required properties are present
        if (title && text) {
          // Variable for the object we will save
          const newNote = {
            title,
            text,
            id: uuidv4(),
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