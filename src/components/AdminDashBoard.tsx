import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AdminDashboardData } from '../types/types';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';

export default function AdminDashBoard() {
  const { isLoading, setIsLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  useEffect(() => {
    const GetDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<AdminDashboardData>('/api/admin/dashboardstats');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    GetDashboardData();
  }, []);

  const users = dashboardData?.users || [];
  const isPageLoading = isLoading || dashboardData === null;

  const formatCreatedAt = (createdAt: string) =>
    new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(createdAt));

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {isPageLoading ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-blue-100 bg-blue-600 px-8 py-10 shadow-lg shadow-blue-100">
            <Loader />
            <p className="text-sm font-medium text-white">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-xl border border-blue-100">
                    🛡️
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    User Management
                  </h1>
                </div>

                <p className="mt-2 text-sm text-slate-500 max-w-xl">
                  Manage system users, assign roles and permissions, and monitor overall platform
                  activity.
                </p>
              </div>

              <button
                onClick={() => navigate('/dashboard/inviteUser')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Invite User
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:bg-white">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Total Users
                  </span>
                  <span className="text-lg">👥</span>
                </div>
                <h2 className="mt-2 text-3xl font-extrabold text-blue-600 tracking-tight">
                  {dashboardData?.totalUsers || 0}
                </h2>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:bg-white">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Managers</span>
                  <span className="text-lg">👔</span>
                </div>
                <h2 className="mt-2 text-3xl font-extrabold text-purple-600 tracking-tight">
                  {dashboardData?.totalManagers || 0}
                </h2>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:bg-white">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Employees</span>
                  <span className="text-lg">👨‍💻</span>
                </div>
                <h2 className="mt-2 text-3xl font-extrabold text-emerald-600 tracking-tight">
                  {dashboardData?.totalEmployees || 0}
                </h2>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:bg-white">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Active Users
                  </span>
                  <span className="text-lg">⚡</span>
                </div>
                <h2 className="mt-2 text-3xl font-extrabold text-amber-500 tracking-tight">
                  {dashboardData?.activeUsers || 0}
                </h2>
              </div>
            </div>
          </div>

          {/* User List */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">User Directory</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  List of registered platform accounts
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.75}
                  stroke="currentColor"
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="mt-6 space-y-4 md:hidden">
              {users.map(user => (
                <div
                  key={user.id}
                  className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs"
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-sm shadow-2xs">
                      {user.userName.charAt(0)}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="font-semibold text-slate-900 text-sm">{user.userName}</h3>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      Created: {formatCreatedAt(user.createdAt)}
                    </span>

                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold
                    ${
                      user.role === 'Admin'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : user.role === 'Manager'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="mt-6 hidden overflow-hidden rounded-xl border border-slate-200/80 md:block">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="px-6 py-3.5">User</th>
                    <th className="px-6 py-3.5">Email</th>
                    <th className="px-6 py-3.5">Role</th>
                    <th className="px-6 py-3.5">Created At</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {users.map(user => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-slate-50/80"
                      onClick={() => {
                        navigate(`/profile/${user.id}`);
                      }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-xs shadow-2xs">
                            {user.userName.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">{user.userName}</p>
                            <p className="text-xs text-slate-400">User #{user.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-600">{user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold
                        ${
                          user.role === 'Admin'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : user.role === 'Manager'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {formatCreatedAt(user.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
