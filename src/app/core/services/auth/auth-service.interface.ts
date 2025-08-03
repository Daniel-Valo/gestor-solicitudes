import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/login-request.model';

export interface AuthServiceInterface {
  login(credentials: LoginRequest): Observable<any>;
  logout(): void;
}
