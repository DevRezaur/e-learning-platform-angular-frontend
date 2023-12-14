import { NgModule } from '@angular/core';

import { CommonRoutingModule } from './common-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonRoutingModule],
  exports: [],
})
export class CommonModule {}
