const { body } = require('express-validator');

const patientValidation = [
  body('fullName').notEmpty(),
  body('dateOfBirth').isISO8601(),
  body('phoneNumber').notEmpty(),
  body('gender').isIn(['male', 'female', 'other']),
  body('status').isIn(['new', 'regular', 'vip'])
];

const doctorValidation = [body('fullName').notEmpty(), body('specialization').notEmpty()];

const appointmentValidation = [
  body('patientId').isInt(),
  body('doctorId').isInt(),
  body('startTime').isISO8601(),
  body('endTime').isISO8601(),
  body('status').isIn(['scheduled', 'completed', 'cancelled'])
];

const paymentValidation = [
  body('appointmentId').isInt(),
  body('amount').isFloat({ gt: 0 }),
  body('method').isIn(['cash', 'card', 'transfer']),
  body('status').isIn(['pending', 'paid', 'failed'])
];

const medicalServiceValidation = [body('name').notEmpty(), body('price').isFloat({ gt: 0 })];

module.exports = {
  patientValidation,
  doctorValidation,
  appointmentValidation,
  paymentValidation,
  medicalServiceValidation
};
