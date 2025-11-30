const NutritionLog = require('../models/NutritionLog');

// Get logs (for dashboard / daily page)
exports.getLogs = async (req, res, next) => {
  try {
    const { from, to } = req.query; // YYYY-MM-DD
    const query = { user: req.user.userId };
    if (from && to) {
      query.date = { $gte: from, $lte: to };
    }
    const logs = await NutritionLog.find(query).sort({ date: 1 });
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

// Add or update log for a given day (DailyProgressLogPage)
exports.saveDayLog = async (req, res, next) => {
  try {
    const { date, foods, waterIntake } = req.body; // date: YYYY-MM-DD string
    if (!date) return res.status(400).json({ message: 'date required' });

    const log = await NutritionLog.findOneAndUpdate(
      { user: req.user.userId, date },
      { $set: { foods, waterIntake } },
      { new: true, upsert: true }
    );
    res.json({ log });
  } catch (err) {
    next(err);
  }
};

// Delete log for a specific date
exports.deleteLog = async (req, res, next) => {
  try {
    const { date } = req.params; // date: YYYY-MM-DD string from URL
    if (!date) return res.status(400).json({ message: 'date required' });

    const result = await NutritionLog.findOneAndDelete({
      user: req.user.userId,
      date
    });

    if (!result) {
      return res.status(404).json({ message: 'No log found for this date' });
    }

    res.json({ message: 'Log deleted successfully', deletedLog: result });
  } catch (err) {
    next(err);
  }
};
