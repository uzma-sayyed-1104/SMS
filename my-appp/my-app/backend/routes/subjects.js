// routes/subjects.js
const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// Add a new subject
router.post('/add', async (req, res) => {
  try {
    const { subjectName, subjectCode } = req.body;

    const newSubject = new Subject({ subjectName, subjectCode });
    await newSubject.save();

    res.status(201).json({ message: 'Subject added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add subject' });
  }
});

// Get all subjects (optional)
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});
// ✅ Route to get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

// ✅ Route to delete a subject by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete subject' });
  }
});
module.exports = router;
