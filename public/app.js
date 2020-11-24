// requires and constants
const express = require('express');
const path = require('path');
const db = require('./db/db');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');

// data parsing for JSON and HTML data
app.use(express.json()); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 

// error function for api routes
function error(err) {
    if(err) throw err;
    res.json(db);
}

// html routes
// return notes.html
app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname + '/public/', 'notes.html'));
}); 

// return index.html
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/', 'index.html'));
});

// api routes
// get - read the db.json and return all saved notes as json
app.get('/api/notes', function(req, res){
    res.json(db); 
});

// post - receive new note to save, add to db.json, return new note to client
app.post('/api/notes', function(req, res){
    req.body.id = uuidv4();
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db), error());
});

// delete - receive query param containing unique id of note to delete.
// read all notes from db.json, remove note with id, rewrite notes to db.json
app.delete('/api/notes/all', function(req, res){
    db.splice(0, db.length); 
    fs.writeFile('./db/db.json', JSON.stringify(db), error());
});

app.delete('/api/notes/:id', function(req, res){
    let id = req.params.id;
    for(i = 0; i < db.length; i++) {
        if (id === db[i].id) {
            db.splice(i, 1);
        }
    }
    fs.writeFile('./db/db.json', JSON.stringify(db), error());
});

// maybe a server thing
app.listen(PORT, function(){
    console.log('Application listening on PORT ' + PORT); 
}); 