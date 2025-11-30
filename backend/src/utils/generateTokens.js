// filepath: d:\\FEDF\\Visual Studio Code\\sec108\\React\\Fedf_Project\\backend\\src\\utils\\generateTokens.js
const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';

exports.generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '1h' });
};
