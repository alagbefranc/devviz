import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'DevViz - AI-Powered Development Platform'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard - DevViz'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];