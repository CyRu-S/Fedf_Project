const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  fats: Number,
  carbs: Number,
  portion: String,
  time: String,           // e.g. "9:35 AM"
});

const nutritionLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: String, required: true }, // YYYY-MM-DD (string for easy matching)
  foods: [foodSchema],
  waterIntake: { type: Number, default: 0 }, // in ml or litres
}, { timestamps: true });

nutritionLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);
