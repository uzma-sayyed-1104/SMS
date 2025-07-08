const express = require('express');
const router = express.Router();

const Student = require('../models/student');
const Teacher = require('../models/teacher');  // you'll create this model
const Class = require('../models/class');      // you'll create this model

router.get('/counts', async (req, res) => {
  try {
    const studentsCount = await Student.countDocuments();
    const teachersCount = await Teacher.countDocuments();
    const classesCount = await Class.countDocuments();

    res.json({
      students: studentsCount,
      teachers: teachersCount,
      classes: classesCount,
      defaultFees: 15000  // fixed value you can change
    });
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    res.status(500).json({ message: 'Error fetching counts' });
  }
});

module.exports = router;
