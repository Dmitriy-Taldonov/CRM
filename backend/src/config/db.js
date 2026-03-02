const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool(env.db);

pool.on('error', (err) => {
  console.error('Unexpected DB error', err);
});

module.exports = pool;
