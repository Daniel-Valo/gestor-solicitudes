import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'solicitudes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/requests/requests.module').then(
        (m) => m.RequestsModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
