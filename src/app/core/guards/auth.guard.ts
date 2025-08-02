import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthMockService } from '../services/auth/auth-mock.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthMockService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
