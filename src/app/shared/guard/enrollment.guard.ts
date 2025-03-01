import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { PopNotificationService } from '../service/pop-notification.service';
import { BackendApiService } from '../service/backend-api.service';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private popNotificationService: PopNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      switchMap((loggedInStatus) => {
        const courseId = route.paramMap.get('courseId');
        const userId = this.authService.getUserId();
        const isAdmin = this.authService.isAdmin();

        if (!loggedInStatus) {
          return this.redirectToLoginPage(state);
        }
        if (isAdmin) {
          return this.handleSuccessCase();
        }
        if (courseId) {
          return this.checkEnrollmentStatus(courseId, userId);
        }

        return this.handleFailureCase();
      })
    );
  }

  private checkEnrollmentStatus(
    courseId: string,
    userId: string
  ): Observable<boolean> {
    return this.backendApiService
      .callGetEnrollmentStatusAPI(courseId, userId)
      .pipe(
        map((response) => response.responseBody.status === 'APPROVED'),
        tap((status) => {
          status ? this.handleSuccessCase() : this.handleFailureCase();
        }),
        catchError(() => this.handleFailureCase())
      );
  }

  private redirectToLoginPage(state: RouterStateSnapshot): Observable<boolean> {
    sessionStorage.setItem('redirectUrl', state.url);
    this.authService.login();
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
