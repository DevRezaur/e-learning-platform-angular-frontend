import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { PopNotificationComponent } from './component/pop-notification/pop-notification.component';
import { Oauth2Service } from './service/oauth2.service';
import { AUTH_SERVICE } from './service/auth-service.interface';

@NgModule({
  declarations: [SidebarComponent, FooterComponent, PopNotificationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, FooterComponent, PopNotificationComponent],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: Oauth2Service,
    },
  ],
})
export class SharedModule {}
