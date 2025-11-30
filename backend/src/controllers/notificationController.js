const NotificationSettings = require('../models/NotificationSettings');

exports.getSettings = async (req, res, next) => {
  try {
    let settings = await NotificationSettings.findOne({ user: req.user.userId });
    if (!settings) {
      settings = await NotificationSettings.create({ user: req.user.userId });
    }
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const { settings: settingsData } = req.body;
    const settings = await NotificationSettings.findOneAndUpdate(
      { user: req.user.userId },
      { $set: settingsData },
      { new: true, upsert: true }
    );
    res.json({ settings });
  } catch (err) {
    next(err);
  }
};
