import { InjectionToken } from '@angular/core';
import { RequestServiceInterface } from './request-service.interface';
export const REQUEST_SERVICE = new InjectionToken<RequestServiceInterface>(
  'RequestService'
);
