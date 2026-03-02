const db = require('../config/db');

const create = async (data) => {
  const query = `INSERT INTO patients (full_name, date_of_birth, phone_number, gender, address, status)
                 VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [data.fullName, data.dateOfBirth, data.phoneNumber, data.gender, data.address, data.status];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const update = async (id, data) => {
  const query = `UPDATE patients SET full_name=$1,date_of_birth=$2,phone_number=$3,gender=$4,address=$5,status=$6,updated_at=NOW()
                 WHERE id=$7 RETURNING *`;
  const values = [data.fullName, data.dateOfBirth, data.phoneNumber, data.gender, data.address, data.status, id];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const remove = async (id) => db.query('DELETE FROM patients WHERE id=$1', [id]);
const findById = async (id) => (await db.query('SELECT * FROM patients WHERE id=$1', [id])).rows[0];

const list = async ({ search = '', page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const params = [`%${search}%`, limit, offset];
  const rows = await db.query(
    `SELECT * FROM patients
     WHERE full_name ILIKE $1 OR phone_number ILIKE $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    params
  );
  const count = await db.query(
    `SELECT COUNT(*) FROM patients WHERE full_name ILIKE $1 OR phone_number ILIKE $1`,
    [params[0]]
  );

  return { items: rows.rows, total: Number(count.rows[0].count), page, limit };
};

module.exports = { create, update, remove, findById, list };
