import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './component/dashboard-page/dashboard-page.component';
import { ManageCoursePageComponent } from './component/manage-course-page/manage-course-page.component';

@NgModule({
  declarations: [DashboardPageComponent, ManageCoursePageComponent],
  imports: [AdminRoutingModule],
})
export class AdminModule {}
