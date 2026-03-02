import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = ['dashboard', 'patients', 'doctors', 'appointments', 'payments', 'services'];

export default function AppLayout() {
  const { logout, user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-700 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <h1 className="font-bold">Clinic CRM</h1>
          <div className="flex items-center gap-4 text-sm">
            <span>{user?.fullName} ({user?.role})</span>
            <button className="rounded bg-white px-3 py-1 text-indigo-700" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[220px_1fr]">
        <aside className="rounded-lg bg-white p-3 shadow">
          <nav className="space-y-2">{links.map((l) => <Link className="block rounded p-2 capitalize hover:bg-indigo-50" key={l} to={`/${l}`}>{l}</Link>)}</nav>
        </aside>
        <main><Outlet /></main>
      </div>
    </div>
  );
}
