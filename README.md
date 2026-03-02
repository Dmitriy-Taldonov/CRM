# Clinic CRM (Full-Stack)

Production-style clinic CRM with React + Tailwind frontend and Node.js/Express + PostgreSQL backend.

## Features
- JWT auth with role-based access (`admin`, `receptionist`, `doctor`)
- Patients, Doctors, Appointments, Payments, Services modules
- Dashboard metrics + chart visualization
- Pagination/search for patients
- Double-booking protection for doctor appointments
- PostgreSQL schema with relations, foreign keys, indexes, timestamps
- Dockerized setup

## Project Structure
```
backend/
  src/
    config/ controllers/ middlewares/ repositories/ routes/ services/ validators/
    db/ migrations/ seed/
frontend/
  src/
    api/ components/ context/ layouts/ pages/ router/
```

## Local Run (without Docker)
1. **Backend**
   - `cd backend`
   - `cp .env.example .env` and adjust DB/JWT values
   - `npm install`
   - `npm run migrate`
   - `npm run seed`
   - `npm run dev`
2. **Frontend**
   - `cd frontend`
   - `cp .env.example .env`
   - `npm install`
   - `npm run dev`

## Docker Run
1. Create env files:
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`
2. Start everything:
   - `docker compose up --build`

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api`

## Seed Credentials
- Admin: `admin@clinic.com` / `Password123!`
- Receptionist: `reception@clinic.com` / `Password123!`
