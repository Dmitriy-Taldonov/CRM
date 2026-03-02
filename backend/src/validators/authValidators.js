const { body } = require('express-validator');

const registerValidation = [
  body('fullName').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['admin', 'receptionist', 'doctor'])
];

const loginValidation = [body('email').isEmail(), body('password').notEmpty()];

module.exports = { registerValidation, loginValidation };
