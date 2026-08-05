import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useEffect, useState } from 'react';
import type { UsersData } from '../types/types';
import { apiAdmin } from '../apis/apis';

export default function ViewUser() {
  const { isLoading, setIsLoading, user: currentUser } = useAuth();
  const [userData, setUserData] = useState<UsersData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      setIsLoading(true);
      setErrorMsg('');
      try {
        const response = await apiAdmin.getUser(userId);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrorMsg('Failed to load user profile or user not found.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-4 px-8 py-10 text-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Loading Profile</h1>
              <p className="mt-1 text-sm text-slate-500">Fetching account details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (errorMsg || !userData) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Profile Unavailable</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {errorMsg || 'We could not find details for this user.'}
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const joinedLabel = userData.createdAt
    ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(userData.createdAt))
    : 'N/A';

  const accountInitial = userData.userName?.charAt(0)?.toUpperCase() || 'U';
  const isAdmin = currentUser?.role.toLowerCase() === 'admin';

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 px-6 py-10 sm:px-8 sm:py-12 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-3xl font-extrabold ring-1 ring-white/20 backdrop-blur">
                  {accountInitial}
                </div>

                <div>
                  <p className="text-sm font-medium text-white/80">User Profile</p>
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{userData.userName}</h1>
                  <p className="mt-2 text-sm text-white/80">
                    <span className="capitalize">{userData.role}</span> account • {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 cursor-pointer"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900">Account Information</h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Username</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{userData.userName}</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</p>
                    <p className="mt-2 break-all text-sm font-semibold text-slate-900">{userData.email}</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Role</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{userData.role}</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Joined</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{joinedLabel}</p>
                  </div>

                  {userData.position && (
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Position</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{userData.position}</p>
                    </div>
                  )}

                  {userData.currentManager && (
                    <div className="rounded-xl bg-white p-4 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Manager</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{userData.currentManager}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Projects Managed / Tasks Assigned */}
              {userData.projectNames && userData.projectNames.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Managed Projects</h2>
                  <div className="flex flex-wrap gap-2">
                    {userData.projectNames.map((name, idx) => (
                      <span key={idx} className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                        📁 {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {userData.tasks && userData.tasks.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Assigned Tasks ({userData.tasks.length})</h2>
                  <div className="space-y-2">
                    {userData.tasks.map(task => (
                      <div key={task.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{task.taskName}</p>
                          <p className="text-xs text-slate-500">{task.description}</p>
                        </div>
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => navigate(isAdmin ? '/dashboard/admin' : '/')}
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
