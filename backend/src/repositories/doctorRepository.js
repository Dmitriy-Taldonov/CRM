const db = require('../config/db');

const create = async ({ fullName, specialization, schedule, cabinetNumber }) => {
  const { rows } = await db.query(
    `INSERT INTO doctors (full_name, specialization, schedule, cabinet_number)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [fullName, specialization, schedule, cabinetNumber]
  );
  return rows[0];
};

const update = async (id, data) => {
  const { rows } = await db.query(
    `UPDATE doctors SET full_name=$1,specialization=$2,schedule=$3,cabinet_number=$4,updated_at=NOW()
     WHERE id=$5 RETURNING *`,
    [data.fullName, data.specialization, data.schedule, data.cabinetNumber, id]
  );
  return rows[0];
};

const remove = async (id) => db.query('DELETE FROM doctors WHERE id=$1', [id]);
const list = async () => (await db.query('SELECT * FROM doctors ORDER BY created_at DESC')).rows;
const findById = async (id) => (await db.query('SELECT * FROM doctors WHERE id=$1', [id])).rows[0];

const appointmentsByDoctor = async (doctorId) => {
  const { rows } = await db.query(
    `SELECT a.*, p.full_name AS patient_name
     FROM appointments a
     JOIN patients p ON p.id = a.patient_id
     WHERE a.doctor_id=$1 ORDER BY a.start_time DESC`,
    [doctorId]
  );
  return rows;
};

const revenueByDoctor = async (doctorId) => {
  const { rows } = await db.query(
    `SELECT COALESCE(SUM(pay.amount),0) AS revenue
     FROM payments pay
     JOIN appointments a ON a.id = pay.appointment_id
     WHERE a.doctor_id=$1 AND pay.status='paid'`,
    [doctorId]
  );
  return Number(rows[0].revenue);
};

module.exports = { create, update, remove, list, findById, appointmentsByDoctor, revenueByDoctor };
