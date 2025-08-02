import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceInterface } from './auth-service.interface';
import { LoginRequest } from '../../models/login-request.model';

@Injectable({ providedIn: 'root' })
export class AuthMockService implements AuthServiceInterface {
  private readonly key = 'auth_token';
  private readonly user = 'user';

  private readonly mockUser = {
    email: 'admin',
    password: '123456',
    name: 'Usuario Demo',
    token: 'mock-token-123',
  };

  constructor() {}

  login(credentials: LoginRequest): Observable<string | null> {
    const { username, password } = credentials;

    return new Observable((observer) => {
      setTimeout(() => {
        if (
          username === this.mockUser.email &&
          password === this.mockUser.password
        ) {
          localStorage.setItem(this.key, this.mockUser.token);
          localStorage.setItem(this.user, JSON.stringify(this.mockUser));
          observer.next(this.mockUser.token);
          observer.complete();
        } else {
          observer.error({ status: 401, message: 'Credenciales inválidas' });
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem(this.key);
    localStorage.removeItem(this.user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.key);
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
