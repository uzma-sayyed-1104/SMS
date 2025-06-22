const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // ✅ ADD THIS
const User = require('../models/User');

const JWT_SECRET = 'mySecretKey123'; // ✅ Replace with env var in production

// POST /api/users/signup
router.post('/signup', async (req, res) => {
  console.log("Signup body:", req.body);
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // ✅ Generate token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token, user: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user: existingUser });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
