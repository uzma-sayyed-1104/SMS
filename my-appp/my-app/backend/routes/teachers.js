const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');

// Add a new teacher
router.post('/add', async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json({ message: 'Teacher added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add teacher' });
  }
});

// Get total count of teachers
router.get('/count', async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teacher count' });
  }
});
// ✅ Route to get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});
// ✅ Route to delete a teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete teacher' });
  }
});


module.exports = router;
