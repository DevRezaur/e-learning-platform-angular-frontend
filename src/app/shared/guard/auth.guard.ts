import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return new Observable((observer) => {
      this.authService.isLoggedIn().subscribe((loggedInStatus) => {
        if (loggedInStatus) {
          observer.next(true);
          observer.complete();
        } else {
          sessionStorage.setItem('redirectUrl', state.url);
          this.authService.login();
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
