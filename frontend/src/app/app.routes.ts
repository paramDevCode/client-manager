import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password/:token', component: ResetPasswordComponent }, 
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
  path: 'dashboard',
  component: DashboardLayoutComponent,
  canActivate: [authGuard],
  children: [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    { path: 'projects', component: ProjectsComponent },

  ]
},

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
