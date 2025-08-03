// services/request.service.ts (mock)
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestServiceInterface } from './request-service.interface';
import { Request } from '../../models/request.model';

@Injectable({ providedIn: 'root' })
export class RequestMockService implements RequestServiceInterface {
  private requests$ = new BehaviorSubject<Request[]>([]);

  constructor() {
    const stored = localStorage.getItem('requests');
    if (stored) {
      this.requests$.next(JSON.parse(stored));
    }
  }

  private updateStorage() {
    localStorage.setItem('requests', JSON.stringify(this.requests$.value));
  }

  getAll(): Observable<Request[]> {
    return this.requests$.asObservable();
  }

  create(request: Request): Observable<number> {
    const current = [...this.requests$.value, request];
    this.requests$.next(current);
    this.updateStorage();
    return of();
  }

  update(updated: Request): Observable<boolean> {
    const current = this.requests$.value.map((r) =>
      r.id === updated.id ? updated : r
    );
    this.requests$.next(current);
    this.updateStorage();
    return of();
  }

  delete(id: number): Observable<boolean> {
    const current = this.requests$.value.filter((r) => r.id !== id);
    this.requests$.next(current);
    this.updateStorage();
    return of();
  }

  getNextId(): number {
    const solicitudes = this.requests$.value;
    const maxId = solicitudes.length
      ? Math.max(...solicitudes.map((s: Request) => s.id))
      : 0;
    return maxId + 1;
  }
}
