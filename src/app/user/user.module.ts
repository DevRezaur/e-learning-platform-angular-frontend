import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CoursePurchasePageComponent } from './page/course-purchase-page/course-purchase-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CoursePurchasePageComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
