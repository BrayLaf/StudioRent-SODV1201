// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Define file path
const UserfilePath = path.join(__dirname, '../users.json');
const StudiofilePath = path.join(__dirname, '../studios.json');


// Read data
const readDataFromFile = (filePath) => {
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
const writeDataToFile = (data, filePath) => {
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
    const data = readDataFromFile(StudiofilePath);
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
    const data = readDataFromFile(StudiofilePath);
    const studios = data.filter(item => item.type === 'studio');
    res.json(studios);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get studio by ID
router.get('/studio/:id', (req, res) => {
  try {
    const data = readDataFromFile(StudiofilePath);
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
    const data = readDataFromFile(StudiofilePath);
    const index = data.findIndex(item => item.type === 'studio' && item.id == req.params.id);
    if (index !== -1) {
      data[index] = { ...data[index], ...req.body };
      writeDataToFile(data, StudiofilePath);
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
    const data = readDataFromFile(UserfilePath);

    // Check if user already exists by email
    const existingUser = data.find(user => user.email === newUser.email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    data.push(newUser);
    writeDataToFile(data, UserfilePath);

    res.status(201).json({ success: true, message: 'User created', data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
});

// Login by email
router.post('/login', (req, res) => {
  try {
    const { email } = req.body;
    const data = readDataFromFile(UserfilePath);

    const user = data.find(item => item.type === 'user' && item.email === email);

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// get user by email
router.get('/user/email/:email', (req, res) => {
  try {
    const data = readDataFromFile(UserfilePath);
    const user = data.find(u => u.type === 'user' && u.email === req.params.email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// update user by email
router.put('/user/email/:email', (req, res) => {
  try {
    const data = readDataFromFile(UserfilePath);
    const index = data.findIndex(u => u.type === 'user' && u.email === req.params.email);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    //Validate allowed/disallowed fields
    const allowedFields = ['name', 'number', 'ownrent'];
    const disallowedFields = Object.keys(req.body).filter(
      key => !allowedFields.includes(key)
    );

    if (disallowedFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields cannot be updated: ${disallowedFields.join(', ')}`
      });
    }

    //Apply only actual changes
    const user = data[index];
    const updates = {};
    let hasChanges = false;

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== user[field]) {
        updates[field] = req.body[field];
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      return res.status(400).json({
        success: false,
        message: 'No changes detected. Update not applied.'
      });
    }

    data[index] = { ...user, ...updates };
    writeDataToFile(data, UserfilePath);

    res.status(200).json({ success: true, message: 'User updated', user: data[index] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
