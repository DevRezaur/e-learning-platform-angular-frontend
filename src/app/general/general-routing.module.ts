import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackPageComponent } from './page/callback-page/callback-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'callback',
    component: CallbackPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
