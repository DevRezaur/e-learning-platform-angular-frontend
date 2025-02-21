import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) {}

  getUserName(): string {
    return this.authService.getUsername();
  }

  getAdminActionItems(): any[] {
    return this.commonService.getAdminActionItems();
  }
}
