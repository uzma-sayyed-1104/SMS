const express = require('express');
const router = express.Router();
const Class = require('../models/class');

// Add a new class
router.post('/add', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json({ message: 'Class added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add class' });
  }
});

// Get total count of classes
router.get('/count', async (req, res) => {
  try {
    const count = await Class.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch class count' });
  }
});
// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});
// Delete a class by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete class' });
  }
});


module.exports = router;
