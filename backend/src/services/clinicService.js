const patientRepo = require('../repositories/patientRepository');
const doctorRepo = require('../repositories/doctorRepository');
const appointmentRepo = require('../repositories/appointmentRepository');
const paymentRepo = require('../repositories/paymentRepository');
const medicalServiceRepo = require('../repositories/serviceRepository');
const db = require('../config/db');
const { AppError } = require('../utils/errors');

const createAppointment = async (data) => {
  const conflict = await appointmentRepo.hasConflict(data);
  if (conflict) throw new AppError('Doctor is already booked for this time slot', 409);
  return appointmentRepo.create(data);
};

const updateAppointment = async (id, data) => {
  const conflict = await appointmentRepo.hasConflict({ ...data, excludeId: id });
  if (conflict) throw new AppError('Doctor is already booked for this time slot', 409);
  return appointmentRepo.update(id, data);
};

const dashboard = async () => {
  const [patients, appointmentsToday, revenueToday, busyDoctor] = await Promise.all([
    db.query('SELECT COUNT(*) FROM patients'),
    db.query('SELECT COUNT(*) FROM appointments WHERE start_time::date = CURRENT_DATE'),
    paymentRepo.dailyRevenue(),
    db.query(`SELECT d.id, d.full_name, COUNT(a.id)::int AS total
              FROM doctors d
              JOIN appointments a ON a.doctor_id=d.id
              WHERE a.start_time::date = CURRENT_DATE
              GROUP BY d.id
              ORDER BY total DESC
              LIMIT 1`)
  ]);

  return {
    totalPatients: Number(patients.rows[0].count),
    totalAppointmentsToday: Number(appointmentsToday.rows[0].count),
    revenueToday,
    mostBusyDoctor: busyDoctor.rows[0] || null
  };
};

module.exports = {
  patientRepo,
  doctorRepo,
  appointmentRepo,
  paymentRepo,
  medicalServiceRepo,
  createAppointment,
  updateAppointment,
  dashboard
};
