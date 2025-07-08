const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// ✅ Test route to check if the route file is working
router.get('/test', (req, res) => {
  res.json({ message: '✅ Student route working' });
});

// 🎯 Route to add a new student
router.post('/add', async (req, res) => {
  try {
    
    console.log('📥 Incoming student data:', req.body);
    const newStudent = new Student(req.body);
    await newStudent.save(); 
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student' });
  }
});
// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});


module.exports = router;
