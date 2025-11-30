const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: String,
  foods: [{
    id: Number,
    name: String,
    calories: Number,
    quantity: String,
    notes: String,
  }],
  totalCalories: Number,
  notes: String,
});

const dietPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  nutritionist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // role=nutionist
  title: String,
  description: String,
  dayType: { type: String, default: 'Regular Day' }, // etc
  meals: {
    breakfast: mealSchema,
    lunch: mealSchema,
    snack: mealSchema,
    dinner: mealSchema,
  },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', dietPlanSchema);
