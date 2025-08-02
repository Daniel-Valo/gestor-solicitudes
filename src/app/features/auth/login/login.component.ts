import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceInterface } from '../../../core/services/auth/auth-service.interface';
import { AUTH_SERVICE } from '../../../core/services/auth/auth.token';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  showToast: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    @Inject(AUTH_SERVICE) private auth: AuthServiceInterface,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.showToast = false;
  }

  login() {
    if (!this.form.valid) {
      this.showError(
        'Por favor, verifique que el formulario tenga datos o información valida.'
      );
      return;
    }
    this.loading = true;

    const username = this.form.get('username')?.value.trim();
    const password = this.form.get('password')?.value.trim();
    const credentials = { username, password };

    this.auth.login(credentials).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/solicitudes']);
      },
      error: (err) => this.showError(err.message || 'Error inesperado'),
    });
  }

  private showError(message: string): void {
    this.loading = false;
    this.errorMessage = message;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), 3500);
  }
}
