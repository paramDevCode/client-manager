import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { DashboardStats } from '../models/dashoard-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
   constructor(private dashboardService:DashboardService, private router:Router){
    
  }
  ngOnInit(): void {
    
  }
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  showProfileDropdown = false;

toggleProfileDropdown() {
  this.showProfileDropdown = !this.showProfileDropdown;
}

// Optional: Close dropdown on outside click
@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  const clickedInside = (event.target as HTMLElement).closest('[tabindex]');
  if (!clickedInside) {
    this.showProfileDropdown = false;
  }
}

// Call this for logout logic
logout() {
  localStorage.removeItem('token');
  window.location.href = '/auth/login'; // or use router.navigate
}


 
}
 