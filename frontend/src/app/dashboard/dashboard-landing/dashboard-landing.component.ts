import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { DashboardStats } from '../models/dashoard-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-landing.component.html',
  styleUrl: './dashboard-landing.component.scss'
})
export class DashboardLandingComponent {
  
dashboardData: DashboardStats = {
  totalProjects: 0,
  activeClients: 0,
  pendingTasks: 0,
  recentUpdates: []
};
  constructor(private dashboardService:DashboardService, private router:Router){
    
  }

  ngOnInit(): void {
    this.getDashboardsData()
  }
  
getDashboardsData(){
this.dashboardService.getDashboardStatus().subscribe((data)=>{
  this.dashboardData = data;
})
}

goToProjects(){
  this.router.navigate(['dashboard/projects'])
}
}
