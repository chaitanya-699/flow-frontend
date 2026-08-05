import axios from 'axios';

export const BaseUrl = 'https://flow-backend-fqaqg4c0g6hrb0aw.southindia-01.azurewebsites.net/api';

export const api = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const LoginMe = api;
export const Login = api;
export const AutoLogin = api;
export const DashboardStat = api;

// Helper API methods
export const apiAdmin = {
  getStats: () => api.get('/admin/dashboardstats'),
  createManager: (data: { userName: string; email: string; password: string }) =>
    api.post('/admin/create/manager', data),
  createEmployee: (data: { userName: string; email: string; password: string; position: string }) =>
    api.post('/admin/create/employee', data),
  getUser: (id: number | string) => api.get(`/admin/users/${id}`),
  updateUser: (
    id: number | string,
    data: { userName?: string; email?: string; password?: string; position?: string }
  ) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: number | string) => api.delete(`/admin/users/${id}`),
  getAllManagers: () => api.get('/admin/managers/all'),
  getAllEmployees: () => api.get('/admin/employees/all'),
};

export const apiManager = {
  getStats: () => api.get('/manager/dashboardstats'),
  getMe: () => api.get('/manager/me'),
  getAllProjects: () => api.get('/manager/projects/all'),
  getProjectById: (id: number | string) => api.get(`/manager/projects/${id}`),
  createProject: (data: {
    projectName: string;
    description: string;
    teamName: string;
    startDate: string;
    endDate: string;
  }) => api.post('/manager/projects/create', data),
  updateProject: (
    id: number | string,
    data: {
      projectName?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      status?: string;
    }
  ) => api.put(`/manager/projects/${id}`, data),
  deleteProject: (id: number | string) => api.delete(`/manager/projects/${id}`),
  getAllTasks: () => api.get('/manager/tasks/all'),
  getTasksByProjectId: (projectId: number | string) =>
    api.get(`/manager/projects/${projectId}/tasks`),
  createTask: (data: {
    projectId: number;
    taskName: string;
    description: string;
    dueDate: string;
    status?: string;
  }) => api.post('/manager/projects/create-task', data),
  updateTask: (
    taskId: number | string,
    data: { taskName?: string; description?: string; dueDate?: string; status?: string }
  ) => api.put(`/manager/tasks/${taskId}`, data),
  updateTaskStatus: (taskId: number | string, status: string) =>
    api.put(`/manager/tasks/${taskId}/status`, { status }),
  deleteTask: (taskId: number | string) => api.delete(`/manager/tasks/${taskId}`),
  getAllEmployees: () => api.get('/manager/employees/all'),
  assignEmployeeToTask: (data: { projectId: number; taskId: number; employeeId: number }) =>
    api.post('/manager/teams/assign-employee', data),
};

export const apiEmployee = {
  getStats: () => api.get('/employee/dashboardstats'),
  getMe: () => api.get('/employee/me'),
  getMyTasks: () => api.get('/employee/tasks'),
  getMyProjects: () => api.get('/employee/projects'),
  updateTaskStatus: (taskId: number | string, status: string) =>
    api.put(`/employee/tasks/${taskId}/status`, { status }),
};
