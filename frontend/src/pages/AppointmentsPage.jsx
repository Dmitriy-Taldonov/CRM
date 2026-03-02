import { useEffect, useState } from 'react';
import api from '../api/client';
import Table from '../components/Table';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => { api.get('/appointments').then((res) => setAppointments(res.data.data)); }, []);
  return <Table columns={[{ key: 'id', label: 'ID' }, { key: 'patient_id', label: 'Patient' }, { key: 'doctor_id', label: 'Doctor' }, { key: 'status', label: 'Status' }, { key: 'start_time', label: 'Start' }]} data={appointments} />;
}
