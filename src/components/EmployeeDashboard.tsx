import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EmployeeDashboardData, ProjectListDto, TaskResponseDto } from '../types/types';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';
import { apiEmployee } from '../apis/apis';

export default function EmployeeDashboard() {
  const { isLoading, setIsLoading } = useAuth();
  const [statsData, setStatsData] = useState<EmployeeDashboardData | null>(null);
  const [updateMsg, setUpdateMsg] = useState('');
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await apiEmployee.getStats();
      setStatsData(response.data);
    } catch (error) {
      console.error('Error fetching employee stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      await apiEmployee.updateTaskStatus(taskId, newStatus);
      setUpdateMsg(`Task #${taskId} status updated to "${newStatus}"!`);
      fetchDashboardData();
      setTimeout(() => setUpdateMsg(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || 'Failed to update task status.');
    }
  };

  const isPageLoading = isLoading && statsData === null;
  const tasks = statsData?.tasks || [];
  const projects = statsData?.projects || [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {isPageLoading ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-blue-100 bg-blue-600 px-8 py-10 shadow-lg shadow-blue-100">
            <Loader />
            <p className="text-sm font-medium text-white">Loading your workspace...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
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

          {updateMsg && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {updateMsg}
            </div>
          )}

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Assigned Tasks
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-base">
                  📌
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-blue-600">
                {statsData?.assignedTasks || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Completed
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-base">
                  ✅
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-600">
                {statsData?.completedTasks || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pending
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-base">
                  ⏳
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-amber-500">
                {statsData?.pendingTasks || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Overdue
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 text-base">
                  🚨
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-rose-600">
                {statsData?.overdueTasks || 0}
              </h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* My Tasks */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">My Assigned Tasks ({tasks.length})</h2>
              </div>

              {tasks.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-sm">
                  🎉 No tasks assigned to you right now!
                </div>
              ) : (
                <div className="space-y-3.5">
                  {tasks.map((task: TaskResponseDto) => (
                    <div
                      key={task.taskId}
                      className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-sm">{task.taskName}</h3>
                        <span className="text-xs text-slate-500">Project: <strong>{task.projectName || 'N/A'}</strong></span>
                      </div>

                      <p className="text-xs text-slate-600">{task.description}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-slate-100 pt-3">
                        <span className="text-slate-500">
                          Due: <strong className="text-slate-700">{new Date(task.dueDate).toLocaleDateString()}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 font-medium">Status:</span>
                          <select
                            value={task.status}
                            onChange={e => handleStatusChange(task.taskId, e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs outline-none focus:border-blue-600 cursor-pointer"
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Projects */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">My Projects ({projects.length})</h2>
              </div>

              {projects.length === 0 ? (
                <div className="py-10 text-center text-slate-500 text-sm">
                  No active projects assigned.
                </div>
              ) : (
                <div className="space-y-6">
                  {projects.map((project: ProjectListDto) => (
                    <div
                      key={project.id}
                      onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                      className="space-y-2 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-800">{project.projectName}</span>
                        <span className="font-extrabold text-blue-600 text-xs bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {project.progress}% Complete
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{project.description}</p>
                      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
