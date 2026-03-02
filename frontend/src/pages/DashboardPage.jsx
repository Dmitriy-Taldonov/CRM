import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import api from '../api/client';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalPatients: 0, totalAppointmentsToday: 0, revenueToday: 0, mostBusyDoctor: null });

  useEffect(() => {
    api.get('/dashboard').then((res) => setStats(res.data.data));
  }, []);

  const chartData = [
    { name: 'Patients', value: stats.totalPatients },
    { name: 'Appointments Today', value: stats.totalAppointmentsToday }
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Patients" value={stats.totalPatients} />
        <StatCard label="Appointments Today" value={stats.totalAppointmentsToday} />
        <StatCard label="Revenue Today" value={`$${stats.revenueToday}`} />
        <StatCard label="Most Busy Doctor" value={stats.mostBusyDoctor?.full_name || 'N/A'} />
      </div>
      <div className="h-72 rounded bg-white p-4 shadow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie dataKey="value" data={chartData} outerRadius={90} label>
              <Cell fill="#4f46e5" />
              <Cell fill="#06b6d4" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
