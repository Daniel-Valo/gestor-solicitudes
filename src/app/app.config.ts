import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AUTH_SERVICE } from './core/services/auth/auth.token';
import { AuthMockService } from './core/services/auth/auth-mock.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: AUTH_SERVICE, useClass: AuthMockService },
    provideRouter(routes),
  ],
};
