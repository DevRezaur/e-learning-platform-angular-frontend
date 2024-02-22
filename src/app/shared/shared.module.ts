import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './component/footer/footer.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, FooterComponent],
})
export class SharedModule {}
