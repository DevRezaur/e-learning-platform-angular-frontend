import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [AdminRoutingModule],
})
export class AdminModule {}
