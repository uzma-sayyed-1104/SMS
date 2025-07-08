const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Add a complaint
router.post('/add', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add complaint' });
  }
});

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

// Delete complaint
router.delete('/:id', async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
});

module.exports = router;
