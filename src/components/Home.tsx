import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-70px)] bg-slate-50">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-2xs backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Project Management Platform
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.12]">
              Organize projects.
              <br />
              <span className="text-blue-600">Manage teams.</span>
              <br />
              Deliver faster.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              ProjectFlow helps teams collaborate efficiently by managing projects, assigning tasks,
              tracking progress and meeting deadlines—all from one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {user ? (
                <>
                  <Link
                    to={`/dashboard/${user.role.toLowerCase()}`}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
                  >
                    Go to Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  <span className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 px-4 py-3 text-sm text-slate-600 shadow-2xs">
                    <span>Welcome back,</span>
                    <span className="font-semibold text-slate-900">{user.userName}</span>
                    <span className="text-base">👋</span>
                  </span>
                </>
              ) : (
                <>
                  <Link
                    to="/login/admin"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
                  >
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  <Link
                    to="/login/employee"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-400 transition-all duration-150 active:scale-[0.98]"
                  >
                    Employee Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Illustration / Quick Stats Mock */}
          <div className="flex justify-center">
            <div className="grid w-full max-w-lg grid-cols-2 gap-5 p-2 bg-slate-200/50 rounded-3xl backdrop-blur-xs border border-slate-300/50 shadow-inner">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects</h3>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-sm">📁</span>
                </div>
                <p className="mt-3 text-4xl font-extrabold text-blue-600 tracking-tight">24</p>
                <p className="mt-1 text-xs text-slate-400 font-medium">+4 active this week</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tasks</h3>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 text-sm">✅</span>
                </div>
                <p className="mt-3 text-4xl font-extrabold text-emerald-600 tracking-tight">186</p>
                <p className="mt-1 text-xs text-slate-400 font-medium">142 completed</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employees</h3>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 text-sm">👥</span>
                </div>
                <p className="mt-3 text-4xl font-extrabold text-purple-600 tracking-tight">42</p>
                <p className="mt-1 text-xs text-slate-400 font-medium">Across 6 departments</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</h3>
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 text-sm">📊</span>
                </div>
                <p className="mt-3 text-4xl font-extrabold text-amber-500 tracking-tight">91%</p>
                <p className="mt-1 text-xs text-slate-400 font-medium">On-time delivery rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to manage your team
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Streamline workflows, keep team members aligned, and track progress effortlessly.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl group-hover:scale-110 transition-transform">
              📁
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Projects</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Create, organize and monitor all your projects seamlessly.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl group-hover:scale-110 transition-transform">
              ✅
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Task Tracking</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Assign tasks and monitor progress in real time with priority tracking.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl group-hover:scale-110 transition-transform">
              👥
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Team Management</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Manage employees, managers and administrators with distinct roles.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">Reports</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Analyze project progress with intuitive dashboards and key statistics.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-6 sm:py-16 sm:px-12 text-white shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to improve your team's productivity?
            </h2>

            <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
              Centralize projects, tasks and collaboration with ProjectFlow.
            </p>

            <Link
              to={user ? `/dashboard/${user.role.toLowerCase()}` : '/login/admin'}
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-blue-600 shadow-md hover:bg-slate-50 transition-all duration-150 active:scale-[0.98]"
            >
              {user ? 'Open Dashboard' : 'Start Now'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

