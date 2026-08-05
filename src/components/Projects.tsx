import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectListDto } from '../types/types';
import { apiManager, apiEmployee } from '../apis/apis';
import { useAuth } from '../context/useAuth';
import Loader from './Loader';

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError('');
      try {
        if (user?.role.toLowerCase() === 'employee') {
          const res = await apiEmployee.getMyProjects();
          setProjects(res.data);
        } else {
          const res = await apiManager.getAllProjects();
          setProjects(res.data);
        }
      } catch (err: unknown) {
        console.error('Error fetching projects:', err);
        setError('Unable to load projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Projects Directory
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View and manage active projects across your organization.
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Back
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700 text-sm">
            {error}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <span className="text-4xl">📁</span>
            <h3 className="mt-3 text-lg font-bold text-slate-800">No Projects Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              {user?.role.toLowerCase() === 'manager'
                ? 'Go to your Manager Dashboard to create a new project.'
                : 'No projects have been assigned to you yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Team</th>
                    <th className="px-6 py-4">Start Date</th>
                    <th className="px-6 py-4">End Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200/80">
                  {projects.map(project => (
                    <tr
                      key={project.id}
                      onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                      className="transition-colors hover:bg-slate-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {project.projectName}
                      </td>

                      <td className="px-6 py-4 max-w-xs truncate text-slate-500">
                        {project.description}
                      </td>

                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {project.teamName || 'Default Team'}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(project.startDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(project.endDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            project.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : project.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
