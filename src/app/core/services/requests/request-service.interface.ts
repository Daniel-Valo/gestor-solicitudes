import { Observable } from 'rxjs';
import { Request } from '../../models/request.model';
export interface RequestServiceInterface {
  getAll(): Observable<Request[]>;
  create(request: Request): Observable<number>;
  update(request: Request): Observable<boolean>;
  delete(id: number): Observable<boolean>;
  getNextId(): number;
}
