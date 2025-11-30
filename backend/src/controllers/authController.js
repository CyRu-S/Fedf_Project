const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { generateAccessToken } = require('../utils/generateTokens');

exports.register = async (req, res, next) => {
  try {
    const { email, password, role, firstName, lastName, age, gender, weight, height, primaryGoal } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      passwordHash: hash,
      role: role || 'user',
      isVerified: true, // for now, skip email verification
    });

    await Profile.create({
      user: user._id,
      firstName,
      lastName,
      age,
      gender,
      weight,
      height,
      primaryGoal,
    });

    const accessToken = generateAccessToken(user);

    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Get user profile information
    const profile = await Profile.findOne({ user: user._id });

    const accessToken = generateAccessToken(user);

    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      profile: profile ? {
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
        gender: profile.gender,
        weight: profile.weight,
        height: profile.height,
        primaryGoal: profile.primaryGoal,
      } : null,
    });
  } catch (err) {
    next(err);
  }
};
