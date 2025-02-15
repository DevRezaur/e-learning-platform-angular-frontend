import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackPageComponent } from './page/callback-page/callback-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { CoursePreviewPageComponent } from './page/course-preview-page/course-preview-page.component';
import { CourseDashboardComponent } from './page/course-dashboard/course-dashboard.component';
import { AuthGuard } from '../shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'callback',
    component: CallbackPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'course-preview/:courseId',
    component: CoursePreviewPageComponent,
  },
  {
    path: 'course-dashboard/:courseId',
    component: CourseDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
