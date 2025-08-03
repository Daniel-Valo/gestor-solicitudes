import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [RequestListComponent, RequestFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestsRoutingModule,
    ConfirmDialogComponent,
  ],
})
export class RequestsModule {}
