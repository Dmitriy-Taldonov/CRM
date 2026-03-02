const asyncHandler = require('../utils/asyncHandler');
const clinicService = require('../services/clinicService');

const patient = {
  create: asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await clinicService.patientRepo.create(req.body) })),
  update: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.patientRepo.update(req.params.id, req.body) })),
  remove: asyncHandler(async (req, res) => { await clinicService.patientRepo.remove(req.params.id); res.json({ success: true }); }),
  get: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.patientRepo.findById(req.params.id) })),
  list: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.patientRepo.list(req.query) }))
};

const doctor = {
  create: asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await clinicService.doctorRepo.create(req.body) })),
  update: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.doctorRepo.update(req.params.id, req.body) })),
  remove: asyncHandler(async (req, res) => { await clinicService.doctorRepo.remove(req.params.id); res.json({ success: true }); }),
  list: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.doctorRepo.list() })),
  appointments: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.doctorRepo.appointmentsByDoctor(req.params.id) })),
  revenue: asyncHandler(async (req, res) => res.json({ success: true, data: { revenue: await clinicService.doctorRepo.revenueByDoctor(req.params.id) } }))
};

const appointment = {
  create: asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await clinicService.createAppointment(req.body) })),
  update: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.updateAppointment(req.params.id, req.body) })),
  cancel: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.appointmentRepo.cancel(req.params.id) })),
  list: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.appointmentRepo.list() }))
};

const payment = {
  create: asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await clinicService.paymentRepo.create(req.body) })),
  revenueDaily: asyncHandler(async (req, res) => res.json({ success: true, data: { total: await clinicService.paymentRepo.dailyRevenue() } }))
};

const service = {
  create: asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await clinicService.medicalServiceRepo.create(req.body) })),
  list: asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.medicalServiceRepo.list() })),
  link: asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await clinicService.medicalServiceRepo.linkToAppointment(req.body) }))
};

const dashboard = asyncHandler(async (req, res) => res.json({ success: true, data: await clinicService.dashboard() }));

module.exports = { patient, doctor, appointment, payment, service, dashboard };
