import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

import AdminDashBoard from './AdminDashBoard';
import ManagerDashboard from './ManagerDashBoard';
import EmployeeDashboard from './EmployeeDashboard';

export default function Dashboard() {
  const { role } = useParams();
  const { user } = useAuth();
  console.log(role);

  switch (role) {
    case 'admin':
      return user?.role.toLowerCase() === 'admin' ? (
        <AdminDashBoard />
      ) : (
        <Navigate to="/login/admin" replace />
      );

    case 'manager':
      return user?.role.toLowerCase() === 'manager' ? (
        <ManagerDashboard />
      ) : (
        <Navigate to="/login/manager" replace />
      );

    case 'employee':
      return user?.role.toLowerCase() === 'employee' ? (
        <EmployeeDashboard />
      ) : (
        <Navigate to="/login/employee" replace />
      );

    default:
      return (
        <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-slate-50 p-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <h2 className="text-xl font-bold text-slate-800">404 Page Not Found</h2>
            <p className="mt-2 text-sm text-slate-500">The requested dashboard role does not exist.</p>
          </div>
        </div>
      );
  }
}

