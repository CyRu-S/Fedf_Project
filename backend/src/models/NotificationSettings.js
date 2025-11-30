const mongoose = require('mongoose');

const notificationSettingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  // match your current toggles in NotificationSettings.jsx
  reminders: {
    breakfast: { type: Boolean, default: true },
    lunch: { type: Boolean, default: true },
    dinner: { type: Boolean, default: true },
  },
  focusAreas: {
    protein: { type: Boolean, default: false },
    water: { type: Boolean, default: true },
    veggies: { type: Boolean, default: true },
    calories: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('NotificationSettings', notificationSettingsSchema);
