import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Request } from '../../../../core/models/request.model';
import { RequestCategory } from '../../../../core/models/request-category.enum';
import { RequestStatus } from '../../../../core/models/request-status.enum';
import { REQUEST_SERVICE } from '../../../../core/services/requests/request.token';
import { RequestServiceInterface } from '../../../../core/services/requests/request-service.interface';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
})
export class RequestListComponent implements OnInit {
  private requests: Request[] = [];
  filteredRequests$: BehaviorSubject<Request[]> = new BehaviorSubject<
    Request[]
  >([]);

  searchTerm$ = new BehaviorSubject<string>('');
  category$ = new BehaviorSubject<string>('Todas');
  status$ = new BehaviorSubject<string>('Todos');

  showConfirm = false;
  idToDelete: number | null = null;
  informationToDisplay: string = '';

  constructor(
    @Inject(REQUEST_SERVICE) private requestService: RequestServiceInterface
  ) {}

  ngOnInit(): void {
    /// obtener las solicitudes y guardarlas en una variable temporal para despues aplicar filtros y busquedas.
    this.requestService.getAll().subscribe((requests) => {
      this.requests = requests; /// asignar las solicitudes obtenidas del servicio a la variable
      this.filterRequests(); /// aplicar los filtros y busqueda.
    });

    // Suscribirse a cambios en filtros para actualizar filteredRequests$
    combineLatest([this.searchTerm$, this.category$, this.status$]).subscribe(
      () => this.filterRequests()
    );
  }

  /// aplicar Filtros y texto de busqueda a la lista de solicitudes
  filterRequests() {
    const textSearch = this.searchTerm$.value.toLowerCase().trim();
    const selectedCategory = this.category$.value;
    const selectedStatus = this.status$.value;

    const filtered = this.requests.filter((r) => {
      const matchesTextSearch =
        r.title.toLowerCase().includes(textSearch) ||
        r.user.toLowerCase().includes(textSearch);

      const matchesCategory =
        selectedCategory === 'Todas' || r.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'Todos' || r.status === selectedStatus;

      return matchesTextSearch && matchesCategory && matchesStatus;
    });

    this.filteredRequests$.next(filtered);
  }

  onTextSearchChange(value: string) {
    this.searchTerm$.next(value);
  }

  onCategoryChange(value: string) {
    this.category$.next(value);
  }

  onStatusChange(value: string) {
    this.status$.next(value);
  }

  askDelete(request: Request) {
    this.idToDelete = request.id;
    this.informationToDisplay = request.title;
    this.showConfirm = true;
  }

  onConfirmResult(confirmed: boolean) {
    this.showConfirm = false;

    if (confirmed && this.idToDelete !== null) {
      this.delete(this.idToDelete);
    }

    this.idToDelete = null;
  }

  private delete(requestId: number) {
    this.requestService.delete(requestId).subscribe({
      next: () => {
        // Eliminar localmente el request de allRequests
        this.requests = this.requests.filter((r) => r.id !== requestId);
        this.filterRequests();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  add() {
    const newRequest = {
      id: this.requestService.getNextId(),
      title: this.generateUUID(),
      description: this.generateUUID(),
      category: RequestCategory.Compra,
      status: RequestStatus.EnProceso,
      createdAt: new Date().toISOString(),
      user: 'Daniel Valdivia Loza',
    };
    this.requestService.create(newRequest).subscribe({
      next: () => {
        // Agregar localmente la nueva solicitud
        this.requests = [...this.requests, newRequest];
        this.filterRequests();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  update(updatedRequest: Request) {
    this.requestService.update(updatedRequest).subscribe({
      next: () => {
        const index = this.requests.findIndex(
          (r) => r.id === updatedRequest.id
        );
        if (index !== -1) {
          this.requests[index] = updatedRequest;
          this.filterRequests();
        }
      },
      error: (err) => console.error(err),
    });
  }

  private generateUUID(): string {
    return crypto.randomUUID(); // 🔐 nativo en navegadores modernos
  }
}
