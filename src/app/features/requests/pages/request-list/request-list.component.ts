import { Component, Inject, OnInit, Signal } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Request } from '../../../../core/models/request.model';
import { RequestCategory } from '../../../../core/models/request-category.enum';
import { RequestStatus } from '../../../../core/models/request-status.enum';
import { REQUEST_SERVICE } from '../../../../core/services/requests/request.token';
import { RequestServiceInterface } from '../../../../core/services/requests/request-service.interface';
import { RequestSignalStore } from '../../../../core/stores/request-signal.store';
import { Router } from '@angular/router';
import { AuthServiceInterface } from '../../../../core/services/auth/auth-service.interface';
import { AUTH_SERVICE } from '../../../../core/services/auth/auth.token';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
})
export class RequestListComponent implements OnInit {
  showModalConfirmDelete = false;
  showModalAddEditRequest = false;

  requestIdToDelete: number = 0;
  deleteConfirmationMessage: string = '';

  selectedRequest: Request | null = null;

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  showToast = false;

  showToastMessage(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Oculta después de 3 segundos
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  constructor(
    public store: RequestSignalStore,
    private router: Router,
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface
  ) {}

  ngOnInit(): void {
    this.store.loadRequests();
  }

  onSearchChange(value: string) {
    this.store.setSearchTerm(value);
  }

  onCategoryChange(value: string) {
    this.store.setCategory(value);
  }

  onStatusChange(value: string) {
    this.store.setStatus(value);
  }

  // Abre el modal de confirmación de eliminación con un mensaje personalizado
  onModalConfirmDeleteOpen(request: Request): void {
    this.requestIdToDelete = request?.id ?? 0;
    this.deleteConfirmationMessage = `Se eliminará la solicitud: ${request.title}. Este proceso no es reversible. ¿Desea continuar?`;
    this.showModalConfirmDelete = true;
  }

  // Maneja la respuesta del modal de confirmación de eliminación
  onModalConfirmDeleteResultEventHandler(confirmed: boolean) {
    if (confirmed && this.requestIdToDelete > 0) {
      this.store.delete(this.requestIdToDelete).subscribe((success) => {
        if (success) {
          this.showToastMessage('Solicitud eliminada correctamente', 'success');
        } else {
          this.showToastMessage(
            'Ocurrió un error al eliminar la solicitud',
            'error'
          );
        }
      });
    }
    this.resetConfirmDeleteModal();
  }

  // Reinicia el estado del modal de eliminación
  private resetConfirmDeleteModal(): void {
    this.showModalConfirmDelete = false;
    this.requestIdToDelete = 0;
    this.deleteConfirmationMessage = '';
  }

  onModalAddEditRequestOpen(request?: Request) {
    this.selectedRequest = request || null;
    this.showModalAddEditRequest = true;
  }

  onConfirmModalAddEditEventHandler({
    request,
    isEdit,
  }: {
    request: Request;
    isEdit: boolean;
  }): void {
    const operation$ = isEdit
      ? this.store.update(request)
      : this.store.add(request);
    operation$.subscribe((success) => {
      if (success) {
        this.showToastMessage(
          isEdit
            ? 'Solicitud actualizada correctamente'
            : 'Solicitud guardada correctamente',
          'success'
        );
        this.closeModal();
      } else {
        this.showToastMessage(
          'Ocurrió un error al guardar la solicitud',
          'error'
        );
      }
    });
    this.closeModal();
  }

  onCancelModalAddEditEventHandler(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.selectedRequest = null;
    this.showModalAddEditRequest = false;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']); // redirige al login o página de inicio
  }
}
