const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: Number, required: true, unique: true },
  // add other fields as per your app
});

module.exports = mongoose.model('Subject', subjectSchema);
