import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CoursePurchasePageComponent } from './page/course-purchase-page/course-purchase-page.component';

@NgModule({
  declarations: [CoursePurchasePageComponent],
  imports: [UserRoutingModule],
})
export class UserModule {}
