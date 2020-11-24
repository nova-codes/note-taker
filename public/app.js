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

// html routes
app.get('/notes', function(req, res){
    res.sendFile(path.join(__dirname + '/public/', 'notes.html'));
}); 

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
    fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
        if(err) throw err;
        
        res.json(db); 
    });
});