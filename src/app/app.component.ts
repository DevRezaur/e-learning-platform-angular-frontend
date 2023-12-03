import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-learning-platform-angular-frontend';
  showSidebar: boolean = false;
  isLoggedIn: boolean = true;
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

  activeMenu: string[] = this.userMenu;
}
