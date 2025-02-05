import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { PopNotificationComponent } from './component/pop-notification/pop-notification.component';

@NgModule({
  declarations: [SidebarComponent, FooterComponent, PopNotificationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, FooterComponent, PopNotificationComponent],
})
export class SharedModule {}
