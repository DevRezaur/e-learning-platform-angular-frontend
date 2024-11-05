import { Component, Inject, OnInit } from '@angular/core';
import { BackendApiService } from '../../service/backend-api.service';
import { CommonService } from '../../service/common.service';
import {
  AUTH_SERVICE,
  AuthServiceInterface,
} from '../../service/auth-service.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  showSidebar: boolean = false;
  userImage: any;

  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthServiceInterface,
    private backendApiService: BackendApiService,
    private commonService: CommonService
  ) {}

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
      .callGetUserByIdAPI(this.authService.getUserId())
      .subscribe((response) => {
        this.loadImage(response.responseBody.user.imageUrl);
      });
  }

  loadImage(imageUrl: string): void {
    this.commonService.getImageFromImageUrl(imageUrl).subscribe((safeUrl) => {
      this.userImage = safeUrl;
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

  getActiveMenu(): any[] {
    if (this.isLoggedIn && this.isAdmin) {
      return this.commonService.getAdminMenu();
    } else if (this.isLoggedIn) {
      return this.commonService.getUserMenu();
    } else {
      return [];
    }
  }

  getUserName(): string {
    return this.authService.getUsername();
  }
}
