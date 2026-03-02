const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const userRepository = require('../repositories/userRepository');
const { AppError } = require('../utils/errors');

const register = async ({ fullName, email, password, role }) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ fullName, email, passwordHash, role });
  return user;
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new AppError('Invalid credentials', 401);

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

  return {
    token,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    }
  };
};

module.exports = { register, login };
