// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, 'backend', 'database.json');

const readDataFromFile = () => {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        // If the file is empty, return an empty array
        return data ? JSON.parse(data) : [];
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  };

// Create studio
router.post('/studio', (req, res) => {
    // Logic to create a studio
});

// Read all studios
router.get('/studios', (req, res) => {
    // Logic to get all studios
});

// Read one studio
router.get('/studio/:id', (req, res) => {
    // Logic to get a single studio by id
});

// Update studio
router.put('/studio/:id', (req, res) => {
    // Logic to update a studio by id
});

// Delete studio
router.delete('/studio/:id', (req, res) => {
    // Logic to delete a studio by id
});


// --- User Routes ---

// Create user
router.post('/user', (req, res) => {
    // Logic to create a user
});

// Read user
router.get('/user/:id', (req, res) => {
    // Logic to get a user by id
});

// Update user
router.put('/user/:id', (req, res) => {
    // Logic to update a user by id
});

// Delete user
router.delete('/user/:id', (req, res) => {
    // Logic to delete a user by id
});

module.exports = router;