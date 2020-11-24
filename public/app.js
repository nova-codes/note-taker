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