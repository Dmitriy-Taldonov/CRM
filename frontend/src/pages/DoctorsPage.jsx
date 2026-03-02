import { useEffect, useState } from 'react';
import api from '../api/client';
import Table from '../components/Table';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => { api.get('/doctors').then((res) => setDoctors(res.data.data)); }, []);
  return <Table columns={[{ key: 'id', label: 'ID' }, { key: 'full_name', label: 'Doctor' }, { key: 'specialization', label: 'Specialization' }, { key: 'cabinet_number', label: 'Cabinet' }]} data={doctors} />;
}
