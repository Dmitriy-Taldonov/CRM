import { useEffect, useState } from 'react';
import api from '../api/client';
import Table from '../components/Table';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  useEffect(() => { api.get('/services').then((res) => setServices(res.data.data)); }, []);
  return <Table columns={[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Service' }, { key: 'price', label: 'Price' }]} data={services} />;
}
