export interface UsersData {
  id: number;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
}
export interface AdminDashboardData {
  totalUsers: number;
  totalManagers: number;
  totalEmployees: number;
  activeUsers: number;
  users: UsersData[];
}
