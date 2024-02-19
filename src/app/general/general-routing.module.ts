import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './component/callback/callback.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ProfilePageComponent } from './component/profile-page/profile-page.component';

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
    component: CallbackComponent,
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
