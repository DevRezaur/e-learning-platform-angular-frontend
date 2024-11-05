import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthServiceInterface {
  login(): void;
  logout(): void;
  isLoggedIn(): Observable<boolean>;
  handleOAuthEvents(): void;

  getAccessToken(): string;
  getIdToken(): string;
  getRefreshToken(): string;

  getUserId(): string;
  getUsername(): string;

  isAdmin(): boolean;
  isUser(): boolean;
}

export const AUTH_SERVICE = new InjectionToken<AuthServiceInterface>(
  'AuthService'
);
