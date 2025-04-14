const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ProtectRoute = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.json({ msg: 'Unauthorized' });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (user) {
    req.user = { username: user.username };
    next();
  } else {
    res.json({ msg: 'Invalid or expired token' });
  }
};

module.exports = ProtectRoute;