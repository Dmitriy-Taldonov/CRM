const db = require('../config/db');

const createUser = async ({ fullName, email, passwordHash, role }) => {
  const query = `
    INSERT INTO users (full_name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role, created_at
  `;
  const { rows } = await db.query(query, [fullName, email.toLowerCase(), passwordHash, role]);
  return rows[0];
};

const findByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
  return rows[0];
};

module.exports = { createUser, findByEmail };
