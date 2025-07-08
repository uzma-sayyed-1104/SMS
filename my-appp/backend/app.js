const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const dashboardRoutes = require('./routes/dashboard');
const classRoutes = require('./routes/classes');
const noticeRoutes = require('./routes/notices');
const subjectRoutes = require('./routes/subjects');
const adminRoutes = require('./routes/admin');
const complaintRoutes = require('./routes/complaints');
const teacherHomeRoute = require('./routes/teacherHomeRoutes');
const teacherClassRoutes = require('./routes/teacherClassRoute');
const teacherlogRoutes = require('./routes/teacherlogin');





const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/teacherHomeRoute', teacherHomeRoute);
app.use('/api/teacherClassRoute', teacherClassRoutes);
app.use('./api/teacherlogin', teacherlogRoutes);


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/SMS')
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server after successful DB connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});
