import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, of, switchMap } from 'rxjs';
import { PopNotificationService } from '../service/pop-notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private popNotificationService: PopNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      switchMap((loggedInStatus) => {
        const requiredRoles = route.data['roles'] as string[];
        const userRoles = this.authService.getRoles();

        if (!loggedInStatus) {
          return this.redirectToLoginPage(state);
        }

        if (
          !requiredRoles?.length ||
          userRoles.some((role) => requiredRoles.includes(role))
        ) {
          return this.handleSuccessCase();
        }

        return this.handleFailureCase();
      })
    );
  }

  private redirectToLoginPage(state: RouterStateSnapshot): Observable<boolean> {
    this.authService.login(state.url);
    return of(false);
  }

  private handleSuccessCase(): Observable<boolean> {
    return of(true);
  }

  private handleFailureCase(): Observable<boolean> {
    this.popNotificationService.setMessage(
      'You are not authorized to access this page!'
    );
    return of(false);
  }
}
