import { Routes } from '@angular/router';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../projects/project-list/project-list.component').then(m => m.ProjectListComponent)
  }
  
];
