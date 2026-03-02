const db = require('../config/db');

const create = async ({ appointmentId, amount, method, status }) => {
  const { rows } = await db.query(
    `INSERT INTO payments (appointment_id, amount, method, status)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [appointmentId, amount, method, status]
  );
  return rows[0];
};

const dailyRevenue = async () => {
  const { rows } = await db.query(
    `SELECT COALESCE(SUM(amount),0) AS total
     FROM payments
     WHERE status='paid' AND created_at::date = CURRENT_DATE`
  );
  return Number(rows[0].total);
};

module.exports = { create, dailyRevenue };
