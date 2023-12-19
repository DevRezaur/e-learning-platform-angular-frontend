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
  activeMenu: string[];
  userMenu: string[] = [
    'Home',
    'Learning Dashboard',
    'Notifications',
    'Manage Profile',
  ];
  adminMenu: string[] = [
    'Home',
    'Admin Dashboard',
    'Notifications',
    'Manage Users',
    'Manage Profile',
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.activeMenu = [];
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();

        if (this.isLoggedIn && this.authService.isAdmin()) {
          this.activeMenu = this.adminMenu;
        } else {
          this.activeMenu = this.userMenu;
        }
      }
    });
  }
}
