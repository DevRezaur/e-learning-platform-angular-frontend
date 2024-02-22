import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PopNotificationService } from '../../service/pop-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pop-notification',
  templateUrl: './pop-notification.component.html',
  styleUrls: ['./pop-notification.component.scss'],
})
export class PopNotificationComponent implements OnInit, OnDestroy {
  @Input() message: string;
  @Input() type: 'success' | 'error';

  isVisible: boolean;
  subscription!: Subscription;

  constructor(private popNotificationService: PopNotificationService) {
    this.message = '';
    this.type = 'success';
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.subscription = this.popNotificationService
      .getMessage()
      .subscribe((notification) => {
        this.message = notification.message;
        this.type = notification.type;
        if (this.message) {
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
