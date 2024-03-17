import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePurchasePageComponent } from './page/course-purchase-page/course-purchase-page.component';

const routes: Routes = [
  {
    path: 'purchase-course/:courseId',
    component: CoursePurchasePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
