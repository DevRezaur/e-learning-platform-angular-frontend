import { NgModule } from '@angular/core';
import { CommonRoutingModule } from './common-routing.module';
import { CallbackComponent } from './component/callback/callback.component';
import { HomePageComponent } from './component/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, CallbackComponent],
  imports: [CommonRoutingModule],
  exports: [],
})
export class CommonModule {}
