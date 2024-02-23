import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './page/manage-course-page/manage-course-page.component';
import { CommonModule } from '@angular/common';
import { AddCoursePageComponent } from './page/add-course-page/add-course-page.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ManageCoursePageComponent,
    AddCoursePageComponent,
  ],
  imports: [AdminRoutingModule, CommonModule],
})
export class AdminModule {}
