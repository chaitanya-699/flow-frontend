export interface UsersData {
  id: number;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
  isActive?: boolean;
  position?: string;
  currentManager?: string;
  projectNames?: string[];
  tasks?: ProjectTask[];
}

export interface AdminDashboardData {
  totalUsers: number;
  totalManagers: number;
  totalEmployees: number;
  activeUsers: number;
  users: UsersData[];
}

export interface ProjectListDto {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  teamName: string;
  progress: number;
  taskCount: number;
}

export interface ProjectTaskDto {
  id: number;
  taskName: string;
  description: string;
  dueDate: string;
  status: string;
  assignedToName?: string;
  assignedToId?: number | null;
  projectId: number;
  projectName?: string;
}

export interface TaskResponseDto {
  taskId: number;
  taskName: string;
  description: string;
  dueDate: string;
  projectId: number;
  status: string;
  assignedToId?: number | null;
  assignedToName?: string;
  projectName?: string;
}

export interface ManagerDashboardData {
  totalProjects: number;
  activeTasks: number;
  teamMembers: number;
  completedTasks: number;
  projects: ProjectListDto[];
  recentTasks: TaskResponseDto[];
}

export interface EmployeeDashboardData {
  assignedTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  tasks: TaskResponseDto[];
  projects: ProjectListDto[];
}

export interface Project {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  teamId?: number;
  teamName?: string;
  status: string;
  progress?: number;
  taskCount?: number;
}

export interface ProjectTask {
  id: number;
  taskName: string;
  description: string;
  dueDate: string;
  projectId: number;
  assignedToId: number | null;
  assignedToName?: string;
  status: string;
  projectName?: string;
}

export interface ViewTask {
  id: number;
  taskName: string;
  description: string;
  dueDate: string;
  status: string;
  assignedToName: string;
  assignedToId?: number | null;
}

export interface ViewProject {
  id: number;
  projectName: string;
  description: string;
  teamName: string;
  startDate: string;
  endDate: string;
  status?: string;
  tasks: ViewTask[];
}
