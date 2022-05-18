import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let password = control.parent?.get('password')?.value;
        return password !== control.value ? { isNotMatch: true } : null;
    }
}