import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { PopNotificationComponent } from './component/pop-notification/pop-notification.component';
import { Oauth2CodeFlowService } from './service/oauth2-code-flow.service';
import { AUTH_SERVICE } from './service/auth-service.interface';

@NgModule({
  declarations: [SidebarComponent, FooterComponent, PopNotificationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, FooterComponent, PopNotificationComponent],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: Oauth2CodeFlowService,
    },
  ],
})
export class SharedModule {}
