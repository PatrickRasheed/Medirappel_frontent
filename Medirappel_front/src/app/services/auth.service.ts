// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

const TOKEN_KEY = 'medirappel_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  // Stocke temporairement l'email pendant le parcours d'inscription
  // (entre la page "email" et la page "password")
  registrationEmail: string | null = null;

  // Permet à l'app entière de réagir à un changement d'état de connexion
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ── Inscription ──────────────────────────────────────────────
  register(email: string, password: string): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.apiUrl}/auth/register`, { email, password })
      .pipe(catchError(this.handleError));
  }

  // ── Vérification OTP ─────────────────────────────────────────
  verifyOtp(email: string, otp: string): Observable<{ message: string; user: User }> {
    return this.http
      .post<{ message: string; user: User }>(`${this.apiUrl}/auth/verify-otp`, { email, otp })
      .pipe(catchError(this.handleError));
  }

  // ── Connexion ────────────────────────────────────────────────
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => this.setToken(res.token)),
        catchError(this.handleError)
      );
  }

  // ── Profil de l'utilisateur connecté ────────────────────────
  getMe(): Observable<{ user: User }> {
    return this.http
      .get<{ user: User }>(`${this.apiUrl}/users/me`)
      .pipe(catchError(this.handleError));
  }

  // ── Déconnexion ──────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  // ── Gestion du token ───────────────────────────────────────────
  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  // ── Gestion d'erreurs centralisée ───────────────────────────────
  private handleError(error: HttpErrorResponse) {
    const message = error.error?.error || 'Une erreur est survenue. Veuillez réessayer.';
    return throwError(() => new Error(message));
  }
}