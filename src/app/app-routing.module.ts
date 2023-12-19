import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'common',
    pathMatch: 'full',
  },
  {
    path: 'common',
    loadChildren: () =>
      import('./common/common.module').then((module) => module.CommonModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
