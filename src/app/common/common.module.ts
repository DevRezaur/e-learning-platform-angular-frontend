import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';
import { CommonRoutingModule } from './common-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonRoutingModule],
  exports: [],
})
export class CommonModule {}
