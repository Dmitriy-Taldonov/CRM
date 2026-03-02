import { useEffect, useState } from 'react';
import api from '../api/client';
import Table from '../components/Table';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [query, setQuery] = useState('');

  const load = () => api.get('/patients', { params: { search: query, page: 1, limit: 10 } }).then((res) => setPatients(res.data.data.items));
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input className="rounded border p-2" placeholder="Search patient" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="rounded bg-indigo-600 px-3 text-white" onClick={load}>Search</button>
      </div>
      <Table columns={[{ key: 'id', label: 'ID' }, { key: 'full_name', label: 'Name' }, { key: 'phone_number', label: 'Phone' }, { key: 'status', label: 'Status' }]} data={patients} />
    </div>
  );
}
