import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SidebarComponent, FooterComponent],
  imports: [BrowserModule],
  exports: [SidebarComponent, FooterComponent],
})
export class SharedModule {}
