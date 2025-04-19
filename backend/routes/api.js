// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define file path
const filePath = path.join(__dirname, 'backend', 'database.json');

// Read data
const readDataFromFile = () => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return data ? JSON.parse(data) : [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

// Write data
const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

// --- Studio Routes ---

// Create studio
router.post('/studio', (req, res) => {
  try {
    const newStudio = { ...req.body, type: 'studio' };
    const data = readDataFromFile();
    data.push(newStudio);
    writeDataToFile(data);
    res.status(201).json({ success: true, message: 'Studio created', data: newStudio });
  } catch (error) {
    console.error('Error creating studio:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all studios
router.get('/studios', (req, res) => {
  try {
    const data = readDataFromFile();
    const studios = data.filter(item => item.type === 'studio');
    res.json(studios);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get studio by ID
router.get('/studio/:id', (req, res) => {
  try {
    const data = readDataFromFile();
    const studio = data.find(item => item.type === 'studio' && item.id == req.params.id);
    if (studio) {
      res.json(studio);
    } else {
      res.status(404).json({ success: false, message: 'Studio not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update studio by ID
router.put('/studio/:id', (req, res) => {
  try {
    const data = readDataFromFile();
    const index = data.findIndex(item => item.type === 'studio' && item.id == req.params.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      writeDataToFile(data);
      res.json({ success: true, message: 'Studio updated', data: data[index] });
    } else {
      res.status(404).json({ success: false, message: 'Studio not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// --- User Routes ---

// Create user
router.post('/user', (req, res) => {
  try {
    const newUser = { ...req.body, type: 'user' };
    const data = readDataFromFile();
    data.push(newUser);
    writeDataToFile(data);
    res.status(201).json({ success: true, message: 'User created', data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get user by ID
router.get('/user/:id', (req, res) => {
  try {
    const data = readDataFromFile();
    const user = data.find(item => item.type === 'user' && item.id == req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update user by ID
router.put('/user/:id', (req, res) => {
  try {
    const data = readDataFromFile();
    const index = data.findIndex(item => item.type === 'user' && item.id == req.params.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      writeDataToFile(data);
      res.json({ success: true, message: 'User updated', data: data[index] });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
