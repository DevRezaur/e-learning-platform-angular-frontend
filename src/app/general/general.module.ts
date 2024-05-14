import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallbackPageComponent } from './page/callback-page/callback-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { GeneralRoutingModule } from './general-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { CoursePreviewPageComponent } from './page/course-preview-page/course-preview-page.component';
import { CourseDashboardComponent } from './page/course-dashboard/course-dashboard.component';

@NgModule({
  declarations: [
    HomePageComponent,
    CallbackPageComponent,
    ProfilePageComponent,
    RegistrationPageComponent,
    CoursePreviewPageComponent,
    CourseDashboardComponent,
  ],
  imports: [GeneralRoutingModule, CommonModule, ReactiveFormsModule],
  exports: [],
})
export class GeneralModule {}
