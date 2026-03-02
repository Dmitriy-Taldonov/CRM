import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'receptionist' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form className="w-full max-w-md rounded bg-white p-6 shadow" onSubmit={submit}>
        <h2 className="mb-4 text-2xl font-bold">Register</h2>
        {['fullName', 'email', 'password'].map((k) => <input key={k} type={k === 'password' ? 'password' : 'text'} className="mb-2 w-full rounded border p-2" placeholder={k} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />)}
        <select className="mb-3 w-full rounded border p-2" onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="receptionist">Receptionist</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="w-full rounded bg-indigo-600 p-2 text-white">Create account</button>
        <p className="mt-3 text-sm">Already have one? <Link className="text-indigo-600" to="/login">Login</Link></p>
      </form>
    </div>
  );
}
