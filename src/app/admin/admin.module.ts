import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './page/manage-course-page/manage-course-page.component';
import { CommonModule } from '@angular/common';
import { CourseDetailsPageComponent } from './page/course-details-page/course-details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckPaymentsPageComponent } from './page/check-payments-page/check-payments-page.component';
import { AllUsersPageComponent } from './page/all-users-page/all-users-page.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ManageCoursePageComponent,
    CourseDetailsPageComponent,
    CheckPaymentsPageComponent,
    AllUsersPageComponent,
  ],
  imports: [AdminRoutingModule, CommonModule, ReactiveFormsModule],
})
export class AdminModule {}
