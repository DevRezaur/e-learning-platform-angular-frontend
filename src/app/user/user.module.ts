import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CoursePurchasePageComponent } from './page/course-purchase-page/course-purchase-page.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [CoursePurchasePageComponent, DashboardPageComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
