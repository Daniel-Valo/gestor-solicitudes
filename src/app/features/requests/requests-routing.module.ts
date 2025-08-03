import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: RequestListComponent },
  { path: 'nuevo', component: RequestFormComponent },
  { path: 'editar/:id', component: RequestFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
