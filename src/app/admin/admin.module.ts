import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './page/manage-course-page/manage-course-page.component';
import { CommonModule } from '@angular/common';
import { CourseDetailsPageComponent } from './page/course-details-page/course-details-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ManageCoursePageComponent,
    CourseDetailsPageComponent,
  ],
  imports: [AdminRoutingModule, CommonModule, ReactiveFormsModule],
})
export class AdminModule {}
