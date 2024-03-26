import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './page/manage-course-page/manage-course-page.component';
import { CourseDetailsPageComponent } from './page/course-details-page/course-details-page.component';
import { CheckPaymentsPageComponent } from './page/check-payments-page/check-payments-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'manage-course',
    component: ManageCoursePageComponent,
  },
  {
    path: 'course-details',
    component: CourseDetailsPageComponent,
  },
  {
    path: 'course-details/:courseId',
    component: CourseDetailsPageComponent,
  },
  {
    path: 'check-payments',
    component: CheckPaymentsPageComponent,
  },
  {
    path: 'general',
    loadChildren: () =>
      import('../general/general.module').then(
        (module) => module.GeneralModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
