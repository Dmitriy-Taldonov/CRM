import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import PatientsPage from '../pages/PatientsPage';
import DoctorsPage from '../pages/DoctorsPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PaymentsPage from '../pages/PaymentsPage';
import ServicesPage from '../pages/ServicesPage';

function Private({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Private><AppLayout /></Private>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="services" element={<ServicesPage />} />
      </Route>
    </Routes>
  );
}
