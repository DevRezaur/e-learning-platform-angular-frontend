import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './component/callback/callback.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ProfileComponent } from './component/profile/profile.component';
import { GeneralRoutingModule } from './general-routing.module';

@NgModule({
  declarations: [HomePageComponent, CallbackComponent, ProfileComponent],
  imports: [GeneralRoutingModule, CommonModule],
  exports: [],
})
export class GeneralModule {}
