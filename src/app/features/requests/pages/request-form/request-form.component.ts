import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Request } from '../../../../core/models/request.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RequestCategory } from '../../../../core/models/request-category.enum';
import { RequestStatus } from '../../../../core/models/request-status.enum';
import { RequestServiceInterface } from '../../../../core/services/requests/request-service.interface';
import { REQUEST_SERVICE } from '../../../../core/services/requests/request.token';
import { onlyTodayOrYesterdayValidator } from '../../../../core/validators/date.validators';

@Component({
  selector: 'app-request-form',
  standalone: false,
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.css',
})
export class RequestFormComponent {
  @Input() request: Request | null = null;
  @Output() onSubmitEvent = new EventEmitter<{
    request: Request;
    isEdit: boolean;
  }>();
  @Output() onCancelEvent = new EventEmitter<void>();

  form!: FormGroup;
  categories = Object.values(RequestCategory);
  statuses = Object.values(RequestStatus);

  constructor(
    private fb: FormBuilder,
    @Inject(REQUEST_SERVICE) private requestService: RequestServiceInterface
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        this.request?.title || '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ],
      ],
      user: [
        this.request?.user || '',
        [Validators.required, Validators.minLength(3)],
      ],
      category: [
        this.request?.category || RequestCategory.Permiso,
        Validators.required,
      ],
      status: [
        this.request?.status || RequestStatus.Pendiente,
        Validators.required,
      ],
      description: [
        this.request?.description || '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(120),
        ],
      ],
      createdAt: [
        this.formatDate(this.request?.createdAt || new Date()),
        [Validators.required, onlyTodayOrYesterdayValidator],
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const isEdit = (this.request?.id ?? 0) > 0;

      const requestData: Request = {
        id: isEdit ? this.request!.id : this.requestService.getNextId(),
        ...this.form.value,
      };

      this.onSubmitEvent.emit({ request: requestData, isEdit });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.onCancelEvent.emit();
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Retorna solo "YYYY-MM-DD"
  }
}
