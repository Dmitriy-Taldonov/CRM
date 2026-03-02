import { useEffect, useState } from 'react';
import api from '../api/client';

export default function PaymentsPage() {
  const [daily, setDaily] = useState(0);
  useEffect(() => { api.get('/payments/revenue/daily').then((res) => setDaily(res.data.data.total)); }, []);
  return <div className="rounded bg-white p-4 shadow">Today revenue: <strong>${daily}</strong></div>;
}
