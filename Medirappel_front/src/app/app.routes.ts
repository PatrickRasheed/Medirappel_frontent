// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard], // ← Ajout : route protégée
  },
  {
    path: '',
    redirectTo: 'login', // ← Modifié : on démarre sur login, pas home (page protégée)
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'email',
    loadComponent: () => import('./pages/email/email.page').then((m) => m.EmailPage),
  },
  {
    path: 'password',
    loadComponent: () => import('./pages/password/password.page').then((m) => m.PasswordPageComponent),
  },
  {
    path: 'otp',
    loadComponent: () => import('./pages/otp/otp.page').then((m) => m.OtpPage),
  },
];