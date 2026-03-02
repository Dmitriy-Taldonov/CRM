const db = require('../config/db');

const hasConflict = async ({ doctorId, startTime, endTime, excludeId }) => {
  const values = [doctorId, startTime, endTime];
  let where = 'doctor_id=$1 AND status <> \'cancelled\' AND tstzrange(start_time, end_time) && tstzrange($2::timestamptz, $3::timestamptz)';
  if (excludeId) {
    values.push(excludeId);
    where += ' AND id <> $4';
  }
  const { rows } = await db.query(`SELECT COUNT(*) FROM appointments WHERE ${where}`, values);
  return Number(rows[0].count) > 0;
};

const create = async (data) => {
  const { rows } = await db.query(
    `INSERT INTO appointments (patient_id,doctor_id,start_time,end_time,status,notes)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.patientId, data.doctorId, data.startTime, data.endTime, data.status, data.notes]
  );
  return rows[0];
};

const update = async (id, data) => {
  const { rows } = await db.query(
    `UPDATE appointments SET patient_id=$1,doctor_id=$2,start_time=$3,end_time=$4,status=$5,notes=$6,updated_at=NOW()
     WHERE id=$7 RETURNING *`,
    [data.patientId, data.doctorId, data.startTime, data.endTime, data.status, data.notes, id]
  );
  return rows[0];
};

const cancel = async (id) => (await db.query(`UPDATE appointments SET status='cancelled',updated_at=NOW() WHERE id=$1 RETURNING *`, [id])).rows[0];
const list = async () => (await db.query('SELECT * FROM appointments ORDER BY start_time DESC')).rows;

module.exports = { hasConflict, create, update, cancel, list };
