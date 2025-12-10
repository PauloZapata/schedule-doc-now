import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'portal-paciente',
    pathMatch: 'full'
  },
  {
    path: 'portal-paciente',
    loadComponent: () => import('./pages/patient-welcome/patient-welcome.component').then(m => m.PatientWelcomeComponent)
  },
  {
    path: 'portal-doctor',
    loadComponent: () => import('./pages/doctor-welcome/doctor-welcome.component').then(m => m.DoctorWelcomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'patient-menu',
    loadComponent: () => import('./pages/patient-menu/patient-menu.component').then(m => m.PatientMenuComponent)
  },
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./pages/doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent)
  },
  {
    path: 'doctor-pending',
    loadComponent: () => import('./pages/doctor-pending/doctor-pending.component').then(m => m.DoctorPendingComponent)
  },
  {
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'my-appointments',
    loadComponent: () => import('./pages/my-appointments/my-appointments.component').then(m => m.MyAppointmentsComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: 'portal-paciente'
  }
];
