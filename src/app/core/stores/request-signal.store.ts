import { computed, Inject, signal } from '@angular/core';
import { Request } from '../models/request.model';
import { RequestCategory } from '../models/request-category.enum';
import { RequestStatus } from '../models/request-status.enum';
import { RequestServiceInterface } from '../services/requests/request-service.interface';
import { REQUEST_SERVICE } from '../services/requests/request.token';

import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestSignalStore {
  private requests = signal<Request[]>([]);

  searchTerm = signal<string>('');
  category = signal<string>('Todas');
  status = signal<string>('Todos');

  readonly applyFilters = computed(() => {
    const text = this.searchTerm().toLowerCase().trim();
    const cat = this.category();
    const stat = this.status();

    return this.requests().filter((r) => {
      const matchesText =
        r.title.toLowerCase().includes(text) ||
        r.user.toLowerCase().includes(text);

      const matchesCategory = cat === 'Todas' || r.category === cat;
      const matchesStatus = stat === 'Todos' || r.status === stat;

      return matchesText && matchesCategory && matchesStatus;
    });
  });

  constructor(
    @Inject(REQUEST_SERVICE) private requestService: RequestServiceInterface
  ) {}

  loadRequests(): void {
    this.requestService.getAll().subscribe((data) => this.requests.set(data));
  }

  add(request: Request): Observable<boolean> {
    return this.requestService.create(request).pipe(
      tap(() => this.loadRequests()),
      map(() => true),
      catchError((err) => {
        console.error('Error al agregar solicitud:', err);
        return of(false);
      })
    );
  }

  update(updated: Request): Observable<boolean> {
    return this.requestService.update(updated).pipe(
      tap(() => this.loadRequests()),
      map(() => true),
      catchError((err) => {
        console.error('Error al actualizar solicitud:', err);
        return of(false);
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.requestService.delete(id).pipe(
      tap(() => this.loadRequests()),
      map(() => true),
      catchError((err) => {
        console.error('Error al eliminar solicitud:', err);
        return of(false);
      })
    );
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setCategory(category: string) {
    this.category.set(category);
  }

  setStatus(status: string) {
    this.status.set(status);
  }

  getSearchTerm = this.searchTerm;
  getCategory = this.category;
  getStatus = this.status;
}
