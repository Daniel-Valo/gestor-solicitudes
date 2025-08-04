import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador que permite solo fechas de hoy o ayer.
 * Rechaza fechas futuras y fechas anteriores a ayer.
 */
export function onlyTodayOrYesterdayValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const inputDate = new Date(control.value);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  const isValid =
    inputDate.getTime() === today.getTime() ||
    inputDate.getTime() === yesterday.getTime();

  return isValid ? null : { invalidDateRange: true };
}

/**
 * Validador que rechaza fechas futuras.
 * Permite hoy y cualquier fecha pasada.
 */
export function noFutureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const inputDate = new Date(control.value);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return inputDate > today ? { futureDate: true } : null;
}