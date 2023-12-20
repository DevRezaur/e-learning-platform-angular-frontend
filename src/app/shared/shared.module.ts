import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent, FooterComponent],
  imports: [BrowserModule],
  exports: [SidebarComponent, FooterComponent],
})
export class SharedModule {}
