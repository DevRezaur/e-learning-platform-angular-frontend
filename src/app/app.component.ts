import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();

        if (this.isLoggedIn && this.authService.isAdmin()) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
    });
  }
}
