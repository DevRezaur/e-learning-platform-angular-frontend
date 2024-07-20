import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePurchasePageComponent } from './page/course-purchase-page/course-purchase-page.component';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';

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
    path: 'purchase-course/:courseId',
    component: CoursePurchasePageComponent,
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
export class UserRoutingModule {}
