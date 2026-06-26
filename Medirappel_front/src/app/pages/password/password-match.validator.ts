import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmKey)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      group.get(confirmKey)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    // Important : nettoyer l'erreur si ça correspond à nouveau
    if (group.get(confirmKey)?.hasError('passwordMismatch')) {
      group.get(confirmKey)?.setErrors(null);
    }

    return null;
  };
}