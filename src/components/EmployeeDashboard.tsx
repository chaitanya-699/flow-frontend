import { Link } from 'react-router-dom';

export default function EmployeeDashboard() {
  const stats = [
    {
      title: 'Assigned Tasks',
      value: 18,
      color: 'text-blue-600',
      icon: '📌',
      bg: 'bg-blue-50',
    },
    {
      title: 'Completed',
      value: 65,
      color: 'text-emerald-600',
      icon: '✅',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Pending',
      value: 7,
      color: 'text-amber-500',
      icon: '⏳',
      bg: 'bg-amber-50',
    },
    {
      title: 'Overdue',
      value: 2,
      color: 'text-rose-600',
      icon: '🚨',
      bg: 'bg-rose-50',
    },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Implement Login API',
      project: 'ERP System',
      priority: 'High',
      dueDate: 'Tomorrow',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Dashboard UI',
      project: 'CRM Portal',
      priority: 'Medium',
      dueDate: 'Friday',
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      project: 'ERP System',
      priority: 'Low',
      dueDate: 'Monday',
      status: 'Pending',
    },
  ];

  const projects = [
    {
      id: 1,
      name: 'ERP System',
      progress: 82,
    },
    {
      id: 2,
      name: 'CRM Portal',
      progress: 55,
    },
    {
      id: 3,
      name: 'Website Redesign',
      progress: 93,
    },
  ];

  const activities = [
    'Manager assigned "Login API".',
    'Comment added to Dashboard UI.',
    'Sprint Planning tomorrow at 10:00 AM.',
    'Project deadline updated.',
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome Back 👋
              </h1>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                Employee Workspace
              </span>
            </div>

            <p className="mt-1.5 text-sm text-slate-500">
              Here's your work summary and assigned tasks for today.
            </p>
          </div>
        </div>

        {/* Statistics */}
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
              to="/tasks"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.25-2.142V8.25" />
              </svg>
              My Tasks
            </Link>

            <Link
              to="/projects"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12.75M4.5 10.5v9.75c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9.75" />
              </svg>
              My Projects
            </Link>

            <Link
              to="/calendar"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Calendar
            </Link>

            <Link
              to="/profile"
              className="group flex items-center justify-center gap-2.5 rounded-xl bg-amber-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-700 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Profile
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Tasks */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Today's Tasks</h2>

              <Link to="/tasks" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3.5">
              {tasks.map(task => (
                <div key={task.id} className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 transition-colors hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 text-sm">{task.title}</h3>

                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        task.priority === 'High'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : task.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs font-medium text-slate-500">{task.project}</p>

                  <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-100 pt-2.5">
                    <span className="inline-flex items-center gap-1 text-slate-600">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      {task.status}
                    </span>

                    <span className="font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Projects */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">My Projects</h2>

              <Link to="/projects" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-6">
              {projects.map(project => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">{project.name}</span>
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
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>

            <Link to="/notifications" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                <p className="text-sm text-slate-700">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

