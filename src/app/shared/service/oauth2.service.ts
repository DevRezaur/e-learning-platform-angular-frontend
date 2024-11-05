import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthServiceInterface } from './oath2-service-interface';

@Injectable({
  providedIn: 'root',
})
export class Oauth2Service implements AuthServiceInterface {
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  private authConfig: AuthConfig = {
    responseType: 'code',
    clientId: 'spa-client',
    scope: 'openid profile email offline_access',
    issuer: 'http://localhost:8080/realms/e-learning-platform',
    redirectUri: `${window.location.origin}/general/callback`,
    postLogoutRedirectUri: window.location.origin,
    requireHttps: false,
    disableAtHashCheck: true,
    showDebugInformation: true,
  };

  constructor(private oauthService: OAuthService, private router: Router) {
    this.initializeOAuth();
  }

  private initializeOAuth(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.updateLoginStatus();
      this.handleOAuthEvents();
    });
  }

  public login(): void {
    this.oauthService.initCodeFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken() || '';
  }

  public getIdToken(): string {
    return this.oauthService.getIdToken() || '';
  }

  public getRefreshToken(): string {
    return this.oauthService.getRefreshToken() || '';
  }

  public getUserId(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['sub'] : '';
  }

  public getUsername(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? `${claims['given_name']} ${claims['family_name']}` : '';
  }

  public isAdmin(): boolean {
    return this.getUserRoles().includes('ADMIN');
  }

  public isUser(): boolean {
    return this.getUserRoles().includes('USER');
  }

  private getUserRoles(): string[] {
    const tokenPayload = this.parseJwtPayload(this.getAccessToken());
    return tokenPayload?.realm_access?.roles || [];
  }

  private parseJwtPayload(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  private updateLoginStatus(): void {
    this.loggedInStatus.next(this.oauthService.hasValidAccessToken());
  }

  private handleOAuthEvents(): void {
    this.oauthService.events.subscribe((event) => {
      if (
        event instanceof OAuthSuccessEvent &&
        event.type === 'token_received'
      ) {
        this.updateLoginStatus();
        this.redirectUser();
      } else if (event instanceof OAuthErrorEvent) {
        console.error('OAuth Error:', event);
      }
    });
  }

  private redirectUser(): void {
    if (this.isAdmin()) {
      this.router.navigate(['/admin']);
    } else if (this.isUser()) {
      this.router.navigate(['/user']);
    }
  }
}
