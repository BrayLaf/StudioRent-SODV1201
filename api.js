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
  try{
    // Logic to create a studio
    const newStudio = req.body; // studio object that we get from the client
    const backendData = readDataFromFile();

    backendData.push(newStudio);
    fs.writeFileSync(filePath, JSON.stringify(backendData, null, 2));

    res.status(201).json({
      success: true,
      message: 'Studio creation successful',
      data: newStudio
    });
  }catch(error){
    console.error('error creating new studio:', error);
    res.status(500).json({
      success: false,
      message: 'internal server error'
    });
  }
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



module.exports = router;