import { Component, Input } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { AuthService } from '../../service/auth.service';

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
    { label: 'Dashboard', route: '/admin/dashboard' },
    { label: 'Profile', route: '/admin/general/profile' },
    { label: 'Notifications', route: '/admin/notification' },
    { label: 'Payment Requests', route: '/admin/payments' },
    { label: 'Statistics', route: '/admin/statistics' },
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
