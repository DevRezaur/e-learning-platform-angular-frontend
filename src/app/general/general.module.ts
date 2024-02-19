import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './component/callback/callback.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';
import { GeneralRoutingModule } from './general-routing.module';

@NgModule({
  declarations: [HomePageComponent, CallbackComponent, ProfilePageComponent],
  imports: [GeneralRoutingModule, CommonModule],
  exports: [],
})
export class GeneralModule {}
