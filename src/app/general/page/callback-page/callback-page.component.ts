import { Component, Inject, OnInit } from '@angular/core';
import {
  AUTH_SERVICE,
  AuthServiceInterface,
} from 'src/app/shared/service/auth-service.interface';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss'],
})
export class CallbackPageComponent implements OnInit {
  constructor(
    @Inject(AUTH_SERVICE) private authService: AuthServiceInterface
  ) {}

  ngOnInit(): void {
    this.authService.handleOAuthEvents();
  }
}
