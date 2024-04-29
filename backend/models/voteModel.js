const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String },
  genre: { type: String, required: true },
  yesCount: { type: Number, default: 0 },
  noCount: { type: Number, default: 0 },
  voters: [{ type: String }] // Store user email ids who have voted
});

module.exports = mongoose.model('Vote', VoteSchema);