const bcrypt = require('bcryptjs');
const db = require('../config/db');

(async () => {
  try {
    const pwd = await bcrypt.hash('Password123!', 10);
    await db.query(`INSERT INTO users (full_name,email,password_hash,role)
      VALUES
      ('System Admin','admin@clinic.com',$1,'admin'),
      ('Front Desk','reception@clinic.com',$1,'receptionist')
      ON CONFLICT (email) DO NOTHING`, [pwd]);

    await db.query(`INSERT INTO doctors (full_name,specialization,schedule,cabinet_number)
      VALUES
      ('Dr. Alice Karim','Cardiology','Mon-Fri 09:00-17:00','C101'),
      ('Dr. Bob Silva','Dermatology','Mon-Sat 10:00-18:00','D204')`);

    await db.query(`INSERT INTO patients (full_name,date_of_birth,phone_number,gender,address,status)
      VALUES
      ('John Doe','1990-02-15','+10000001','male','Main street 1','regular'),
      ('Sarah Connor','1985-08-20','+10000002','female','Main street 2','vip')`);

    await db.query(`INSERT INTO medical_services (name,price,description)
      VALUES ('Consultation',50,'Initial consultation'),('ECG',120,'Electrocardiogram')`);

    console.log('Seed completed');
    process.exit(0);
  } catch (e) {
    console.error('Seed failed', e);
    process.exit(1);
  }
})();
