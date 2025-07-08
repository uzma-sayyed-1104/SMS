const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  // add other fields as per your app
});


module.exports = mongoose.model('Class', classSchema);
