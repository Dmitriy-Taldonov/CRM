const db = require('../config/db');

const create = async ({ name, price, description }) => {
  const { rows } = await db.query(
    `INSERT INTO medical_services (name,price,description) VALUES ($1,$2,$3) RETURNING *`,
    [name, price, description]
  );
  return rows[0];
};

const linkToAppointment = async ({ appointmentId, serviceId, quantity }) => {
  const { rows } = await db.query(
    `INSERT INTO appointment_services (appointment_id,service_id,quantity)
     VALUES ($1,$2,$3) RETURNING *`,
    [appointmentId, serviceId, quantity]
  );
  return rows[0];
};

const list = async () => (await db.query('SELECT * FROM medical_services ORDER BY created_at DESC')).rows;

module.exports = { create, linkToAppointment, list };
