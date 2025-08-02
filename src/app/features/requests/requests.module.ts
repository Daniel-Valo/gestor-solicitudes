import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestsRoutingModule } from './requests-routing.module';

@NgModule({
  declarations: [], //'RequestListComponent', 'RequestFormComponent'
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RequestsRoutingModule,
  ],
})
export class RequestsModule {}
