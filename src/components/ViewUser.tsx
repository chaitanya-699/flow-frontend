import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useEffect, useState } from 'react';
import type { User } from '../context/AuthContext';

export default function ViewUser() {
  const { isLoading, setIsLoading } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col items-center gap-4 px-8 py-10 text-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Loading profile</h1>
              <p className="mt-1 text-sm text-slate-500">Fetching your account details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
          <div className="max-w-md text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Profile unavailable
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              We could not find an active user session. Please sign in again to view your profile.
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const joinedLabel = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date());

  const accountInitial = user.userName?.charAt(0)?.toUpperCase() || 'U';

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
                  <p className="text-sm font-medium text-white/80">Profile</p>
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                    {user.userName}
                  </h1>
                  <p className="mt-2 text-sm text-white/80">{user.role} account</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-slate-900">Account Details</h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Full Name
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{user.userName}</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </p>
                    <p className="mt-2 break-all text-sm font-semibold text-slate-900">
                      {user.email}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Role
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{user.role}</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Member Since
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{joinedLabel}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Profile Summary</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This account is set up for the {user.role.toLowerCase()} workspace. Use this page
                  to review your identity, confirm your access level, and jump back to your
                  dashboard.
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>

                <div className="mt-4 space-y-3">
                  <button
                    onClick={() => navigate(`/dashboard/${user.role.toLowerCase()}`)}
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-5 sm:p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Security
                </p>
                <h3 className="mt-2 text-xl font-bold">Keep your account safe</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li>• Use a strong password and rotate it regularly.</li>
                  <li>• Review your role permissions before making changes.</li>
                  <li>• Log out when using a shared device.</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
