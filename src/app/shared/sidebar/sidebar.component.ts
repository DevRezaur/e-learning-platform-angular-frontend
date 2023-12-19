import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  @Input() activeMenu: string[];

  showSidebar: boolean;

  constructor(private authService: AuthService) {
    this.showSidebar = false;
    this.isLoggedIn = false;
    this.activeMenu = [];
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
