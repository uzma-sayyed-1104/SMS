// models/notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  postedBy: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
