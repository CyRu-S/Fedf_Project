const Profile = require('../models/Profile');
const User = require('../models/User');

exports.getMe = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.userId });
    const user = await User.findById(req.user.userId);
    res.json({ profile, user: { email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const { profile: profileData } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.userId },
      { $set: profileData },
      { new: true, upsert: true }
    );
    res.json({ profile });
  } catch (err) {
    next(err);
  }
};
