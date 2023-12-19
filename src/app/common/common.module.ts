import { NgModule } from '@angular/core';

import { CallbackComponent } from './callback/callback.component';
import { CommonRoutingModule } from './common-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, CallbackComponent],
  imports: [CommonRoutingModule],
  exports: [],
})
export class CommonModule {}
