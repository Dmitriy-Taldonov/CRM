const express = require('express');
const controller = require('../controllers/authController');
const validate = require('../middlewares/validateRequest');
const { registerValidation, loginValidation } = require('../validators/authValidators');

const router = express.Router();

router.post('/register', registerValidation, validate, controller.register);
router.post('/login', loginValidation, validate, controller.login);

module.exports = router;
