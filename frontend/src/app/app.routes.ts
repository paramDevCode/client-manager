import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
 import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
 
export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent,
     canActivate: [loginGuard]
   },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/reset-password/:token', component: ResetPasswordComponent }, 
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
  path: 'dashboard',
  component: DashboardLayoutComponent,
  canActivate: [authGuard],
   canLoad: [authGuard],
   children:[
    {path:'projects',
      loadChildren: ()=> import('./projects/projects.routes').then(m=> m.PROJECTS_ROUTES)
    },
    {
      path:'',
      loadComponent:()=> 
        import('./dashboard/dashboard-landing/dashboard-landing.component').then(m=> m.DashboardLandingComponent)
    }   
   ]
 
},

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];
