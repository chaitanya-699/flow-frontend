import { Link } from 'react-router-dom';

export default function ManagerDashboard() {
  const stats = [
    { title: 'Projects', value: 12, color: 'text-blue-600', icon: '📁', bg: 'bg-blue-50' },
    { title: 'Active Tasks', value: 48, color: 'text-emerald-600', icon: '✅', bg: 'bg-emerald-50' },
    { title: 'Team Members', value: 18, color: 'text-purple-600', icon: '👥', bg: 'bg-purple-50' },
    { title: 'Completed', value: '84%', color: 'text-amber-500', icon: '📊', bg: 'bg-amber-50' },
  ];

  const projects = [
    {
      id: 1,
      name: 'ERP System',
      progress: 82,
      status: 'In Progress',
    },
    {
      id: 2,
      name: 'CRM Portal',
      progress: 55,
      status: 'In Progress',
    },
    {
      id: 3,
      name: 'Company Website',
      progress: 95,
      status: 'Almost Complete',
    },
  ];

  const tasks = [
    {
      title: 'Assign authentication module',
      employee: 'John',
      priority: 'High',
    },
    {
      title: 'Review dashboard UI',
      employee: 'Alice',
      priority: 'Medium',
    },
    {
      title: 'Prepare Sprint Planning',
      employee: 'David',
      priority: 'High',
    },
  ];

  const activities = [
    'John completed Login API.',
    'Alice uploaded project documents.',
    'David commented on Task #25.',
    'Michael joined ERP project.',
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome Back 👋
              </h1>
              <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                Manager Workspace
              </span>
            </div>

            <p className="mt-1.5 text-sm text-slate-500">
              Here's what's happening with your projects and team members today.
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(stat => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.title}
                </span>
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${stat.bg} text-base`}>
                  {stat.icon}
                </span>
              </div>

              <h2 className={`mt-3 text-3xl font-extrabold tracking-tight ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="mb-5 text-lg font-bold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/projects/create"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Project
            </Link>

            <Link
              to="/tasks/create"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Assign Task
            </Link>

            <Link
              to="/employees"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6 0 3.375 3.375 0 016 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Team Members
            </Link>

            <Link
              to="/reports"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-amber-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              View Reports
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Projects */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Active Projects</h2>

              <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-6">
              {projects.map(project => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-bold text-slate-800">{project.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{project.status}</p>
                    </div>

                    <span className="font-extrabold text-blue-600 text-sm bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recent Tasks</h2>

              <Link to="/tasks" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3.5">
              {tasks.map(task => (
                <div key={task.title} className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 transition-colors hover:bg-slate-50">
                  <h3 className="font-semibold text-slate-900 text-sm">{task.title}</h3>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 font-bold text-[10px] text-slate-700">
                        {task.employee.charAt(0)}
                      </span>
                      <span>{task.employee}</span>
                    </div>

                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                        task.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>

            <Link to="/activity" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <p className="text-sm text-slate-700">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

