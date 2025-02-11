import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  constructor(private authService: AuthService) {}

  getUserName(): string {
    return this.authService.getUsername();
  }
}
