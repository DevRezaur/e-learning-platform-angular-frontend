import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [SidebarComponent, FooterComponent],
  imports: [BrowserModule],
  exports: [SidebarComponent, FooterComponent],
})
export class SharedModule {}
