const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { AppError } = require('../utils/errors');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = payload;
    return next();
  } catch (error) {
    return next(new AppError('Invalid token', 401));
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError('Forbidden', 403));
  }
  return next();
};

module.exports = { authenticate, authorize };
