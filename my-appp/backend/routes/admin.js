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
  console.log("🔐 Token payload:", req.user);  // log decoded JWT payload

  try {
    const admin = await adminprofile.findById(req.user.id).select('-password');

    if (!admin) {
      console.log("❌ Admin not found for ID:", req.user.id);
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log("✅ Admin found:", admin);
    res.json(admin);
  } catch (error) {
    console.error("🔥 Server error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
