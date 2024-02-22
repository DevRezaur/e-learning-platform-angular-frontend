import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './page/manage-course-page/manage-course-page.component';

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
