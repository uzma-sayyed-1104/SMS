// routes/notice.js
const express = require('express');
const router = express.Router();
const Notice = require('../models/notice'); // Import the Notice model

// Add a new notice
router.post('/add', async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    await newNotice.save();
    res.status(201).json({ message: 'Notice posted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to post notice' });
  }
});

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});
// DELETE - Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
