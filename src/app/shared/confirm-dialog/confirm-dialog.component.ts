import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  @Output() onConfirmResultEvent = new EventEmitter<boolean>();
  @Input() title: string = '';
  @Input() message: string = '';

  onConfirm() {
    this.onConfirmResultEvent.emit(true);
  }

  onCancel() {
    this.onConfirmResultEvent.emit(false);
  }
}
