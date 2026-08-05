import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AdminDashboardData, UsersData } from '../types/types';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';
import { apiAdmin } from '../apis/apis';

export default function AdminDashBoard() {
  const { isLoading, setIsLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<UsersData | null>(null);
  const [editForm, setEditForm] = useState({ userName: '', email: '', position: '', password: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await apiAdmin.getStats();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const users = dashboardData?.users || [];
  const filteredUsers = users.filter(
    u =>
      u.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isPageLoading = isLoading && dashboardData === null;

  const formatCreatedAt = (createdAt: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(createdAt));
    } catch {
      return createdAt;
    }
  };

  const handleDeleteUser = async (user: UsersData, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete user "${user.userName}"?`)) return;

    try {
      await apiAdmin.deleteUser(user.id);
      setActionSuccess(`User "${user.userName}" deleted successfully.`);
      fetchDashboardData();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || 'Failed to delete user.');
    }
  };

  const handleOpenEdit = (user: UsersData, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingUser(user);
    setEditForm({
      userName: user.userName,
      email: user.email,
      position: user.position || '',
      password: '',
    });
    setEditError('');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsUpdating(true);
    setEditError('');

    try {
      await apiAdmin.updateUser(editingUser.id, editForm);
      setActionSuccess(`User "${editingUser.userName}" updated successfully.`);
      setEditingUser(null);
      fetchDashboardData();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setEditError(msg || 'Failed to update user.');
    } finally {
      setIsUpdating(false);
    }
  };

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
                  Manage system users, assign roles and permissions, and monitor overall platform activity.
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
                Invite / Create User
              </button>
            </div>

            {/* Notification Banner */}
            {actionSuccess && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                {actionSuccess}
              </div>
            )}

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:bg-white">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Users</span>
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
                  <span className="text-xs font-semibold uppercase tracking-wider">Active Accounts</span>
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
                <p className="text-xs text-slate-500 mt-0.5">List of registered platform accounts</p>
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
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search users by name or email..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-150 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="mt-6 space-y-4 md:hidden">
              {filteredUsers.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">No users found.</div>
              ) : (
                filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-2xs cursor-pointer hover:border-blue-300"
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-sm shadow-2xs">
                          {user.userName.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-semibold text-slate-900 text-sm">{user.userName}</h3>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
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

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Created: {formatCreatedAt(user.createdAt)}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={e => handleOpenEdit(user, e)}
                          className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={e => handleDeleteUser(user, e)}
                          className="px-2.5 py-1 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                        No users matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => (
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-slate-50/80 cursor-pointer"
                        onClick={() => navigate(`/profile/${user.id}`)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white text-xs shadow-2xs">
                              {user.userName.charAt(0).toUpperCase()}
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
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
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

                        <td className="px-6 py-4 text-slate-500">{formatCreatedAt(user.createdAt)}</td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={e => handleOpenEdit(user, e)}
                              className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={e => handleDeleteUser(user, e)}
                              className="px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Edit User #{editingUser.id}</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {editError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={editForm.userName}
                  onChange={e => setEditForm({ ...editForm, userName: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              {editingUser.role === 'Employee' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={editForm.position}
                    onChange={e => setEditForm({ ...editForm, position: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  New Password (leave blank to keep current)
                </label>
                <input
                  type="password"
                  value={editForm.password}
                  onChange={e => setEditForm({ ...editForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
