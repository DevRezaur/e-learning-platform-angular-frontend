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
import { BackendApiService } from './backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private oauthService: OAuthService,
    private backendApiService: BackendApiService,
    private router: Router
  ) {
    this.configure();
    this.setIsLoggedInStatus();
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
    redirectUri: window.location.origin + '/general/callback',
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
        this.initUser();
        this.setIsLoggedInStatus();
        if (this.isAdmin()) {
          this.router.navigate(['/admin']);
        } else if (this.isUser()) {
          const redirectUrl = sessionStorage.getItem('redirectUrl') ?? '';
          sessionStorage.removeItem('redirectUrl');
          this.router.navigateByUrl(redirectUrl);
        }
      } else if (event instanceof OAuthErrorEvent) {
        console.error(event);
      }
    });
  }

  private initUser(): void {
    const userId = this.getUserId();
    const email = this.getEmail();
    const firstName = this.getFirstName();
    const lastName = this.getLastName();
    const userData = { userId, email, firstName, lastName };

    this.backendApiService.callInitUserAPI(userData).subscribe();
  }

  private setIsLoggedInStatus(): void {
    this.oauthService.hasValidAccessToken()
      ? this.loggedInStatus.next(true)
      : this.loggedInStatus.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  public isAdmin(): boolean {
    return this.getRoles().includes('ADMIN') ? true : false;
  }

  public isUser(): boolean {
    return this.getRoles().includes('USER') ? true : false;
  }

  public getRoles(): string[] {
    const accessToken: string = this.oauthService.getAccessToken();
    if (accessToken) {
      const splittedToken: string[] = accessToken.split('.');
      const claims = JSON.parse(atob(splittedToken[1]));
      return claims.realm_access.roles;
    }
    return [];
  }

  public getUserId(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.sub : '';
  }

  public getEmail(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.preferred_username : '';
  }

  public getFullname(): string {
    return `${this.getFirstName()} ${this.getLastName()}`;
  }

  public getFirstName(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.given_name : '';
  }

  public getLastName(): string {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims.family_name : '';
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
