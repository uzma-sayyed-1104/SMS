// routes/admin.js
const express = require('express');
const jwt = require('jsonwebtoken');
const adminprofile = require('../models/Admin');
const auth = require('../middleware/auth');


const router = express.Router();
let token;
// Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminprofile.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

   token = jwt.sign({ id: admin._id }, "mySecretKey123", { expiresIn: "1h" });

    console.log("Token is ", token)
    
    res.json({ token, adminId: admin._id, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin Profile Route (GET)
router.get('/profile', auth, async (req, res) => {
  console.log(req.user.id);
  try {
    const admin = await adminprofile.findById(req.user.id).select('-password');
    console.log("Fetched admin:", admin); 
    console.log("admin is ",token);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
