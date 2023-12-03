import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [SidebarComponent, FooterComponent],
  exports: [SidebarComponent, FooterComponent],
})
export class SharedModule {}
