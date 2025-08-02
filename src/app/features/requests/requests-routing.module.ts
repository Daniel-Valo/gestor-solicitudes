import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  // {
  //   path: '',
  //   component: 'RequestListComponent',
  // },
  // {
  //   path: 'nueva',
  //   component: 'RequestFormComponent',
  // },
  // {
  //   path: ':id/editar',
  //   component: 'RequestFormComponent',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
