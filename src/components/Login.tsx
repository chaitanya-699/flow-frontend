import { Navigate, useParams } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Manager from './ManagerLogin';
import EmployeeLogin from './EmployeeLogin';
import { useAuth } from '../context/useAuth';

export default function LoginContainer() {
  const { role } = useParams();
  const { user } = useAuth();

  switch (role) {
    case 'admin':
      return !user ? <AdminLogin /> : <Navigate to="/dashboard/admin" />;
    case 'manager':
      return !user ? <Manager /> : <Navigate to="/dashboard/manager" />;
    case 'employee':
      return !user ? <EmployeeLogin /> : <Navigate to="/dashboard/employee" />;
    default:
      return (
        <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-slate-50 p-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
            <h2 className="text-xl font-bold text-slate-800">404 Page Not Found</h2>
            <p className="mt-2 text-sm text-slate-500">The requested login role does not exist.</p>
          </div>
        </div>
      );
  }
}
