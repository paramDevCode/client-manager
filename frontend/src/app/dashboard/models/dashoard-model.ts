export interface DashboardStats {
  totalProjects: number;
  activeClients: number;
  pendingTasks: number;
  recentUpdates: { message: string }[];
}
