import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@clinic.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form className="w-full max-w-md rounded bg-white p-6 shadow" onSubmit={submit}>
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <input className="mb-2 w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="mb-2 w-full rounded border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
        <button className="w-full rounded bg-indigo-600 p-2 text-white">Sign In</button>
        <p className="mt-3 text-sm">No account? <Link className="text-indigo-600" to="/register">Register</Link></p>
      </form>
    </div>
  );
}
