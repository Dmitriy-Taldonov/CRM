const express = require('express');
const c = require('../controllers/clinicController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateRequest');
const v = require('../validators/clinicValidators');

const router = express.Router();
router.use(authenticate);

router.get('/dashboard', c.dashboard);

router.route('/patients')
  .get(c.patient.list)
  .post(authorize('admin', 'receptionist'), v.patientValidation, validate, c.patient.create);
router.route('/patients/:id')
  .get(c.patient.get)
  .put(authorize('admin', 'receptionist'), v.patientValidation, validate, c.patient.update)
  .delete(authorize('admin'), c.patient.remove);

router.route('/doctors')
  .get(c.doctor.list)
  .post(authorize('admin'), v.doctorValidation, validate, c.doctor.create);
router.route('/doctors/:id')
  .put(authorize('admin'), v.doctorValidation, validate, c.doctor.update)
  .delete(authorize('admin'), c.doctor.remove);
router.get('/doctors/:id/appointments', c.doctor.appointments);
router.get('/doctors/:id/revenue', authorize('admin'), c.doctor.revenue);

router.route('/appointments')
  .get(c.appointment.list)
  .post(authorize('admin', 'receptionist'), v.appointmentValidation, validate, c.appointment.create);
router.put('/appointments/:id', authorize('admin', 'receptionist'), v.appointmentValidation, validate, c.appointment.update);
router.patch('/appointments/:id/cancel', authorize('admin', 'receptionist'), c.appointment.cancel);

router.post('/payments', authorize('admin', 'receptionist'), v.paymentValidation, validate, c.payment.create);
router.get('/payments/revenue/daily', authorize('admin'), c.payment.revenueDaily);

router.route('/services')
  .get(c.service.list)
  .post(authorize('admin'), v.medicalServiceValidation, validate, c.service.create);
router.post('/services/link', authorize('admin', 'receptionist'), c.service.link);

module.exports = router;
