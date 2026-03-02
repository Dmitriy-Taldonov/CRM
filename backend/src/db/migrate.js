const fs = require('fs');
const path = require('path');
const db = require('../config/db');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../migrations/schema.sql'), 'utf8');
    await db.query(sql);
    console.log('Migration completed');
    process.exit(0);
  } catch (e) {
    console.error('Migration failed', e);
    process.exit(1);
  }
})();
