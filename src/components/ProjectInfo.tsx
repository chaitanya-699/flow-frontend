import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ViewProject, ViewTask, UsersData } from '../types/types';
import { apiManager, apiEmployee } from '../apis/apis';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';

export default function ProjectInfo() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState<ViewProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState<UsersData[]>([]);

  // Modals & forms
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState<ViewTask | null>(null);
  const [selectedEmpId, setSelectedEmpId] = useState(0);

  const [taskForm, setTaskForm] = useState({
    taskName: '',
    description: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const [actionSuccess, setActionSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isManager = user?.role.toLowerCase() === 'manager';

  const fetchProjectDetails = async () => {
    if (!projectId) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiManager.getProjectById(projectId);
      setProject(res.data);

      if (isManager) {
        const empRes = await apiManager.getAllEmployees().catch(() => ({ data: [] }));
        setEmployees(empRes.data || []);
      }
    } catch (err: unknown) {
      console.error('Error fetching project info:', err);
      setError('Unable to load project details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId, user]);

  const handleAddTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;
    setSubmitting(true);
    try {
      await apiManager.createTask({
        projectId: Number(projectId),
        taskName: taskForm.taskName,
        description: taskForm.description,
        dueDate: taskForm.dueDate,
        status: 'Not Started',
      });
      setActionSuccess('Task added successfully!');
      setShowAddTask(false);
      setTaskForm({
        taskName: '',
        description: '',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      fetchProjectDetails();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || 'Failed to add task.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !showAssignModal || !selectedEmpId) return;
    setSubmitting(true);
    try {
      await apiManager.assignEmployeeToTask({
        projectId: Number(projectId),
        taskId: showAssignModal.id,
        employeeId: Number(selectedEmpId),
      });
      setActionSuccess(`Task assigned successfully!`);
      setShowAssignModal(null);
      setSelectedEmpId(0);
      fetchProjectDetails();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || 'Failed to assign task.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: number, taskName: string) => {
    if (!window.confirm(`Are you sure you want to delete task "${taskName}"?`)) return;
    try {
      await apiManager.deleteTask(taskId);
      setActionSuccess(`Task "${taskName}" deleted.`);
      fetchProjectDetails();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || 'Failed to delete task.');
    }
  };

  const handleTaskStatusChange = async (taskId: number, status: string) => {
    try {
      if (isManager) {
        await apiManager.updateTaskStatus(taskId, status);
      } else {
        await apiEmployee.updateTaskStatus(taskId, status);
      }
      setActionSuccess(`Task status updated to "${status}"`);
      fetchProjectDetails();
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      alert(msg || 'Failed to update task status.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-4xl p-6 text-center">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-700 text-sm">
          {error || 'Project not found.'}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
        >
          ← Back to Projects
        </button>

        {isManager && (
          <button
            onClick={() => setShowAddTask(true)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
          >
            + Add New Task
          </button>
        )}
      </div>

      {actionSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {actionSuccess}
        </div>
      )}

      {/* Project Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Project #{project.id}
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{project.projectName}</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{project.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-slate-100 pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Team</p>
            <p className="font-semibold text-slate-900 text-sm mt-1">{project.teamName || 'Unassigned'}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Start Date</p>
            <p className="font-semibold text-slate-900 text-sm mt-1">
              {new Date(project.startDate).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">End Date</p>
            <p className="font-semibold text-slate-900 text-sm mt-1">
              {new Date(project.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Project Tasks ({project.tasks?.length || 0})</h2>
        </div>

        {!project.tasks || project.tasks.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            No tasks created for this project yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-3.5">Task</th>
                  <th className="px-6 py-3.5">Assigned To</th>
                  <th className="px-6 py-3.5">Due Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  {isManager && <th className="px-6 py-3.5 text-right">Actions</th>}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200/80">
                {project.tasks.map(task => (
                  <tr key={task.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{task.taskName}</p>
                      <p className="text-xs text-slate-500">{task.description}</p>
                    </td>

                    <td className="px-6 py-4">
                      {task.assignedToName && task.assignedToName !== 'Not Assigned' ? (
                        <span className="font-semibold text-slate-800">{task.assignedToName}</span>
                      ) : isManager ? (
                        <button
                          onClick={() => { setShowAssignModal(task); setSelectedEmpId(0); }}
                          className="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 border border-purple-200 cursor-pointer"
                        >
                          + Assign Employee
                        </button>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Unassigned</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={task.status}
                        onChange={e => handleTaskStatusChange(task.id, e.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs outline-none focus:border-blue-600 cursor-pointer"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>

                    {isManager && (
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteTask(task.id, task.taskName)}
                          className="px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: Add Task */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Task to {project.projectName}</h3>
              <button onClick={() => setShowAddTask(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskForm.taskName}
                  onChange={e => setTaskForm({ ...taskForm, taskName: e.target.value })}
                  placeholder="e.g. Implement API validation"
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={taskForm.description}
                  onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
                  placeholder="Task details and instructions..."
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-blue-600"
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
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition cursor-pointer"
                >
                  {submitting ? 'Adding...' : 'Add Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
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
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Assign "{showAssignModal.taskName}"</h3>
              <button onClick={() => setShowAssignModal(null)} className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Employee</label>
                <select
                  required
                  value={selectedEmpId}
                  onChange={e => setSelectedEmpId(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm outline-none focus:border-purple-600 cursor-pointer"
                >
                  <option value={0}>-- Select Employee --</option>
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.userName} ({e.position || 'Employee'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition cursor-pointer"
                >
                  {submitting ? 'Assigning...' : 'Confirm Assignment'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAssignModal(null)}
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
