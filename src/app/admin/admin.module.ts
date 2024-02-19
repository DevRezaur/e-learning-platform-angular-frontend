import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ManageCoursePageComponent } from './manage-course-page/manage-course-page.component';

@NgModule({
  declarations: [DashboardComponent, ManageCoursePageComponent],
  imports: [AdminRoutingModule],
})
export class AdminModule {}
