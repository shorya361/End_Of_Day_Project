const jwt = require('jsonwebtoken');
const config = require('../config/keys');

module.exports = (req, res, next) => {
  // get token
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'no token , authorization denied!' });
  }

  try {
    const decoded = jwt.verify(token, config.secretOrKey);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
