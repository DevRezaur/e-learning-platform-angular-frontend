import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MenuItem } from '../model/menu-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isLoggedIn: boolean;
  @Input() isAdmin: boolean;

  showSidebar: boolean;
  userMenu: MenuItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Learning Dashboard', route: '/' },
    { label: 'Notifications', route: '/' },
    { label: 'Manage Profile', route: '/' },
  ];
  adminMenu: MenuItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Admin Dashboard', route: '/' },
    { label: 'Notifications', route: '/' },
    { label: 'Manage Users', route: '/' },
    { label: 'Manage Profile', route: '/' },
  ];

  constructor(private authService: AuthService) {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.showSidebar = false;
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  getActiveMenu(): MenuItem[] {
    if (this.isLoggedIn && this.isAdmin) {
      return this.adminMenu;
    } else if (this.isLoggedIn) {
      return this.userMenu;
    } else {
      return [];
    }
  }

  getUserName(): string {
    return this.authService.getUsername();
  }
}
