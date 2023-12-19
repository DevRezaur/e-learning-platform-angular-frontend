import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthConfig,
  NullValidationHandler,
  OAuthErrorEvent,
  OAuthEvent,
  OAuthService,
  OAuthSuccessEvent,
} from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

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
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/e-learning-platform',
    redirectUri: window.location.origin + '/common/callback',
    postLogoutRedirectUri: window.location.origin,
    clientId: 'spa-client',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    requireHttps: false,
    disableAtHashCheck: true,
    showDebugInformation: true,
  };

  public redirectOnCallback(): void {
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else if (event instanceof OAuthSuccessEvent) {
        if (
          event.type === 'token_received' &&
          window.location.href === 'http://localhost:4200/common/callback'
        ) {
          if (this.isAdmin()) {
            alert('Admin login Success');
            this.router.navigate(['/common/home']);
          } else if (this.isUser()) {
            alert('User login Success');
            this.router.navigate(['/common/home']);
          }
        }
      } else {
        console.warn(event);
      }
    });
  }

  public getClaims(): string[] {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    const claims = JSON.parse(atob(tokens[1]));
    return claims.realm_access.roles;
  }

  public getOAuthEvent(): Observable<OAuthEvent> {
    return this.oauthService.events;
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

  public get username() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.preferred_username : '';
  }

  public get userId() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.sub : '';
  }

  public get idToken() {
    let token: any = this.oauthService.getIdToken();
    return token ? token : '';
  }

  public get accessToken() {
    let token: any = this.oauthService.getAccessToken();
    return token ? token : '';
  }

  public get refreshToken() {
    let token: any = this.oauthService.getRefreshToken();
    return token ? token : '';
  }

  public login() {
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }
}
