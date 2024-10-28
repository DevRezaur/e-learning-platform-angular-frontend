import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopNotificationService } from '../../service/pop-notification.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-notification',
  templateUrl: './pop-notification.component.html',
  styleUrls: ['./pop-notification.component.scss'],
})
export class PopNotificationComponent implements OnInit, OnDestroy {
  message: string = '';
  actionName: string = '';
  actionUrl: string = '';
  isVisible: boolean = false;
  subscription!: Subscription;

  constructor(
    private popNotificationService: PopNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.popNotificationService
      .getMessage()
      .subscribe((notification) => {
        this.message = notification.message;
        this.actionName = notification.actionName;
        this.actionUrl = notification.actionUrl;
        this.isVisible = this.message ? true : false;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleNotification() {
    this.router.navigate([this.actionUrl]);
    this.popNotificationService.resetMessage();
  }
}
