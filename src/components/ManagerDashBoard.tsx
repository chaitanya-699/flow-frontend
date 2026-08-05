import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type {
  ManagerDashboardData,
  ProjectListDto,
  TaskResponseDto,
  UsersData,
} from '../types/types';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';
import { apiManager } from '../apis/apis';

export default function ManagerDashboard() {
  const { isLoading, setIsLoading } = useAuth();
  const [statsData, setStatsData] = useState<ManagerDashboardData | null>(null);
  const [employees, setEmployees] = useState<UsersData[]>([]);
  const availableEmployees = employees.filter(e => !e.tasks || e.tasks.length === 0);
  // Modals
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'team'>('projects');

  // Form states
  const [projectForm, setProjectForm] = useState({
    projectName: '',
    description: '',
    teamName: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [taskForm, setTaskForm] = useState({
    projectId: 0,
    taskName: '',
    description: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Not Started',
  });

  const [assignForm, setAssignForm] = useState({
    projectId: 0,
    taskId: 0,
    employeeId: 0,
  });

  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, empRes] = await Promise.all([
        apiManager.getStats(),
        apiManager.getAllEmployees().catch(() => ({ data: [] })),
      ]);
      setStatsData(statsRes.data);
      setEmployees(empRes.data || []);
    } catch (error) {
      console.error('Error fetching manager dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(employees);
  }, [employees]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const isPageLoading = isLoading && statsData === null;

  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    try {
      await apiManager.createProject(projectForm);
      setFormSuccess('Project created successfully!');
      setShowCreateProject(false);
      setProjectForm({
        projectName: '',
        description: '',
        teamName: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      fetchDashboardData();
      setTimeout(() => setFormSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setFormError(msg || 'Failed to create project.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.projectId) {
      setFormError('Please select a project.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      await apiManager.createTask({
        ...taskForm,
        projectId: Number(taskForm.projectId),
      });
      setFormSuccess('Task created successfully!');
      setShowCreateTask(false);
      setTaskForm({
        projectId: 0,
        taskName: '',
        description: '',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Not Started',
      });
      fetchDashboardData();
      setTimeout(() => setFormSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setFormError(msg || 'Failed to create task.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssignTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignForm.projectId || !assignForm.taskId || !assignForm.employeeId) {
      setFormError('Please select project, task, and employee.');
      return;
    }
    setSubmitting(true);
    setFormError('');
    try {
      await apiManager.assignEmployeeToTask({
        projectId: Number(assignForm.projectId),
        taskId: Number(assignForm.taskId),
        employeeId: Number(assignForm.employeeId),
      });
      setFormSuccess('Employee assigned to task successfully!');
      setShowAssignTask(false);
      setAssignForm({ projectId: 0, taskId: 0, employeeId: 0 });
      fetchDashboardData();
      setTimeout(() => setFormSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setFormError(msg || 'Failed to assign employee to task.');
    } finally {
      setSubmitting(false);
    }
  };

  const projects = statsData?.projects || [];
  const recentTasks = statsData?.recentTasks || [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {isPageLoading ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-blue-100 bg-blue-600 px-8 py-10 shadow-lg shadow-blue-100">
            <Loader />
            <p className="text-sm font-medium text-white">Loading workspace...</p>
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
                <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                  Manager Workspace
                </span>
              </div>

              <p className="mt-1.5 text-sm text-slate-500">
                Here's what's happening with your projects and team members today.
              </p>
            </div>
          </div>

          {formSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {formSuccess}
            </div>
          )}

          {/* Statistics Grid */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
            onClick={() => navigate("/projects")}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Projects
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-base">
                  📁
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-blue-600">
                {statsData?.totalProjects || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"

            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Active Tasks
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-base">
                  ✅
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-emerald-600">
                {statsData?.activeTasks || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Team Members
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 text-base">
                  👥
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-purple-600">
                {statsData?.teamMembers || 0}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Completed Tasks
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-base">
                  📊
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-amber-500">
                {statsData?.completedTasks || 0}
              </h2>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="mb-5 text-lg font-bold text-slate-900 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              Quick Actions
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <button
                onClick={() => {
                  setShowCreateProject(true);
                  setFormError('');
                }}
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all cursor-pointer"
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
                Create Project
              </button>

              <button
                onClick={() => {
                  setShowCreateTask(true);
                  setFormError('');
                }}
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Create Task
              </button>

              <button
                onClick={() => {
                  setShowAssignTask(true);
                  setFormError('');
                }}
                className="group flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 p-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6 0 3.375 3.375 0 016 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                Assign Task
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-4">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-3 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
                activeTab === 'projects'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`pb-3 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
                activeTab === 'tasks'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Recent Tasks ({recentTasks.length})
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`pb-3 text-sm font-semibold border-b-2 cursor-pointer transition-colors ${
                activeTab === 'team'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Available Employees ({employees.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'projects' && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Active Projects</h2>
              {projects.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No projects created yet. Click "Create Project" to get started!
                </div>
              ) : (
                <div className="space-y-6">
                  {projects.map((project: ProjectListDto) => (
                    <div
                      key={project.id}
                      onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                      className="rounded-xl border border-slate-200/80 p-5 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer space-y-3"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-bold text-slate-800 text-base">
                            {project.projectName}
                          </p>
                          <p className="text-xs text-slate-500">{project.description}</p>
                        </div>
                        <span className="font-extrabold text-blue-600 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          {project.progress}% Complete
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>
                          Team:{' '}
                          <strong className="text-slate-700">
                            {project.teamName || 'Default'}
                          </strong>
                        </span>
                        <span>
                          Tasks: <strong className="text-slate-700">{project.taskCount}</strong>
                        </span>
                        <span>
                          Status:{' '}
                          <span className="font-semibold text-blue-600">{project.status}</span>
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Recent Tasks</h2>
              {recentTasks.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No tasks created yet.
                </div>
              ) : (
                <div className="space-y-3.5">
                  {recentTasks.map((task: TaskResponseDto) => (
                    <div
                      key={task.taskId}
                      className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 text-sm">{task.taskName}</h3>
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {task.status}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{task.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-100 pt-2 text-slate-500">
                        <span>
                          Project:{' '}
                          <strong className="text-slate-700">{task.projectName || 'N/A'}</strong>
                        </span>
                        <span>
                          Assigned to:{' '}
                          <strong className="text-slate-700">
                            {task.assignedToName || 'Unassigned'}
                          </strong>
                        </span>
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Registered Employees</h2>
              {employees.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-sm">
                  No employees available.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {employees.map(emp => (
                    <div
                      key={emp.id}
                      className="rounded-xl border border-slate-200 p-4 bg-slate-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white font-bold text-sm">
                          {emp.userName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{emp.userName}</p>
                          <p className="text-xs text-slate-500">{emp.email}</p>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                        <span>
                          Position: <strong>{emp.position || 'Employee'}</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal: Create Project */}
      {showCreateProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Create New Project</h3>
              <button
                onClick={() => setShowCreateProject(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.projectName}
                  onChange={e => setProjectForm({ ...projectForm, projectName: e.target.value })}
                  placeholder="e.g. Mobile Banking App"
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.description}
                  onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Briefly describe the project goals..."
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={projectForm.teamName}
                  onChange={e => setProjectForm({ ...projectForm, teamName: e.target.value })}
                  placeholder="e.g. Core Engineering Team"
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={projectForm.startDate}
                    onChange={e => setProjectForm({ ...projectForm, startDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={projectForm.endDate}
                    onChange={e => setProjectForm({ ...projectForm, endDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
                >
                  {submitting ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateProject(false)}
                  className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Create Task */}
      {showCreateTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Create Project Task</h3>
              <button
                onClick={() => setShowCreateTask(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Project
                </label>
                <select
                  required
                  value={taskForm.projectId}
                  onChange={e => setTaskForm({ ...taskForm, projectId: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value={0}>-- Select a Project --</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  value={taskForm.taskName}
                  onChange={e => setTaskForm({ ...taskForm, taskName: e.target.value })}
                  placeholder="e.g. Design Database Schema"
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={taskForm.description}
                  onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                  placeholder="Describe the task instructions..."
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3.5 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={taskForm.dueDate}
                  onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 py-2 px-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition cursor-pointer"
                >
                  {submitting ? 'Creating...' : 'Create Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateTask(false)}
                  className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Assign Task */}
      {showAssignTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Assign Task to Employee</h3>
              <button
                onClick={() => setShowAssignTask(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleAssignTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1. Select Project
                </label>
                <select
                  required
                  value={assignForm.projectId}
                  onChange={e =>
                    setAssignForm({ ...assignForm, projectId: Number(e.target.value), taskId: 0 })
                  }
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value={0}>-- Select a Project --</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2. Select Task
                </label>
                <select
                  required
                  value={assignForm.taskId}
                  onChange={e => setAssignForm({ ...assignForm, taskId: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value={0}>-- Select a Task --</option>
                  {recentTasks
                    .filter(
                      t =>
                        assignForm.projectId === 0 || t.projectId === Number(assignForm.projectId)
                    )
                    .map(t => (
                      <option key={t.taskId} value={t.taskId}>
                        {t.taskName} ({t.assignedToName || 'Unassigned'})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3. Select Employee
                </label>
                <select
                  required
                  value={assignForm.employeeId}
                  onChange={e =>
                    setAssignForm({ ...assignForm, employeeId: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value={0}>-- Select an Employee --</option>
                  {availableEmployees.length > 0 ? (
                    availableEmployees.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.userName} ({e.position || 'Employee'})
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No employees are currently available
                    </option>
                  )}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition cursor-pointer"
                >
                  {submitting ? 'Assigning...' : 'Assign Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssignTask(false)}
                  className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
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
