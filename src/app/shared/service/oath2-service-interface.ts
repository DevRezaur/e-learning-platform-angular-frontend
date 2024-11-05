import { Observable } from 'rxjs';

export interface AuthServiceInterface {
  login(): void;
  logout(): void;
  isLoggedIn(): Observable<boolean>;

  getAccessToken(): string;
  getIdToken(): string;
  getRefreshToken(): string;

  getUserId(): string;
  getUsername(): string;

  isAdmin(): boolean;
  isUser(): boolean;
}
