import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;
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

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      this.isAdmin = this.authService.isAdmin();
    });
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
