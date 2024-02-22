import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CallbackComponent } from './component/callback/callback.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';
import { GeneralRoutingModule } from './general-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent, CallbackComponent, ProfilePageComponent],
  imports: [GeneralRoutingModule, CommonModule, ReactiveFormsModule],
  exports: [],
})
export class GeneralModule {}
