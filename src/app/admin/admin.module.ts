import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './component/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './component/manage-course-page/manage-course-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardPageComponent, ManageCoursePageComponent],
  imports: [AdminRoutingModule, CommonModule],
})
export class AdminModule {}
