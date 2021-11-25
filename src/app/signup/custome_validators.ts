import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MobileNumberValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasTenDigit = /([^\d])\d{10}([^\d])/.test(value);


        const minLength = hasTenDigit ;

        return !minLength ? { minLength: true } : null;
    }
}