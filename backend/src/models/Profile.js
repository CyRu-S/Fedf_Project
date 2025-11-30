const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  weight: Number,
  height: Number,
  primaryGoal: String,
  // you can expand later with allergies, etc.
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
