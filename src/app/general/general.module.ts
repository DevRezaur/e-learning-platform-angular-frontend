import { NgModule } from '@angular/core';
import { GeneralRoutingModule } from './general-routing.module';
import { CallbackComponent } from './component/callback/callback.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomePageComponent, CallbackComponent],
  imports: [GeneralRoutingModule, CommonModule],
  exports: [],
})
export class GeneralModule {}
