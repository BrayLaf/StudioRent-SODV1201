// Import modules
const express = require('express');
const api = require('./routes/api.js');

const app = express();
const PORT = 3000;

// Middleware to parse the incoming request object as JSON
app.use(express.json());

// Middleware to serve static files in the 'public' folder
app.use(express.static('public'));

// Middleware to route any requests to '/api' to our api
app.use('/api', api);

// Start the server
app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is running and app is listening on port " + PORT); 
    } else {
        console.log("ERROR: server cannot start.", error); 
    }
});