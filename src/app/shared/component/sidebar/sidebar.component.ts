import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { AuthService } from '../../service/auth.service';
import { BackendApiService } from '../../service/backend-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userImage: any;
  showSidebar: boolean;
  userMenu: MenuItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Learning Dashboard', route: '/user/dashboard' },
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

  constructor(
    private authService: AuthService,
    private backendApiService: BackendApiService,
    private sanitizer: DomSanitizer
  ) {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.showSidebar = false;
  }

  ngOnInit(): void {
    this.setLoginStatusAndLoadUserInfo();
  }

  setLoginStatusAndLoadUserInfo(): void {
    this.authService.isLoggedIn().subscribe((loggedInStatus) => {
      this.isLoggedIn = loggedInStatus;
      if (this.isLoggedIn) {
        this.isAdmin = this.authService.isAdmin();
        this.loadProfileData();
      }
    });
  }

  loadProfileData(): void {
    this.backendApiService
      .callGetUserDataAPI(this.authService.getUserId())
      .subscribe({
        next: (response) => {
          const userData = response?.responseBody?.user || [];
          this.loadImage(userData.imageUrl);
        },
        error: (error) => console.error(error),
      });
  }

  loadImage(imageUrl: string): void {
    this.getImage(imageUrl).subscribe({
      next: (image) => {
        this.userImage = this.sanitizer.bypassSecurityTrustUrl(image);
      },
      error: (error) => console.error(error),
    });
  }

  getImage(imageUrl: string): Observable<string> {
    return this.backendApiService
      .callGetContentAPI(imageUrl)
      .pipe(map((response) => URL.createObjectURL(new Blob([response]))));
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
