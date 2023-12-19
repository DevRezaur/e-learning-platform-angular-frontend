import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.configure();
  }

  public configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
  }

  private authConfig: AuthConfig = {
    responseType: 'code',
    clientId: 'spa-client',
    scope: 'openid profile email offline_access',
    issuer: 'http://localhost:8080/realms/e-learning-platform',
    redirectUri: window.location.origin + '/common/callback',
    postLogoutRedirectUri: window.location.origin,
    requireHttps: false,
    disableAtHashCheck: true,
    showDebugInformation: true,
  };

  public login() {
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public redirectOnCallback(): void {
    this.oauthService.events.subscribe((event) => {
      if (
        event instanceof OAuthSuccessEvent &&
        event.type === 'token_received'
      ) {
        if (this.isAdmin()) {
          this.router.navigate(['/admin']);
        } else if (this.isUser()) {
          this.router.navigate(['/common/home']);
        }
      } else if (event instanceof OAuthErrorEvent) {
        console.error(event);
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken();
  }

  public isAdmin(): boolean {
    return this.getClaims().includes('ADMIN') ? true : false;
  }

  public isUser(): boolean {
    return this.getClaims().includes('USER') ? true : false;
  }

  public getClaims(): string[] {
    const accessToken: string = this.oauthService.getAccessToken();
    const splittedToken: string[] = accessToken.split('.');
    const claims = JSON.parse(atob(splittedToken[1]));
    return claims.realm_access.roles;
  }

  public getUserId(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.sub : '';
  }

  public getUsername(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.preferred_username : '';
  }

  public getIdToken(): string {
    let token: string = this.oauthService.getIdToken();
    return token ? token : '';
  }

  public getAccessToken(): string {
    let token: string = this.oauthService.getAccessToken();
    return token ? token : '';
  }

  public getRefreshToken(): string {
    let token: string = this.oauthService.getRefreshToken();
    return token ? token : '';
  }
}
