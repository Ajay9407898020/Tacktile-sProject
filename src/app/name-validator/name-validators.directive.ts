import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[appNameValidators]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true }]
})
export class NameValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {        

        if (control.value != null && control.value !== '') {

            let re = new RegExp('^[a-zA-Z]+[a-zA-Z0-9 ]*[a-zA-Z0-9]$')

            let isValid = control.value ? re.test(control.value) : null
            
            if (isValid && isValid !== null) {

                return null;
            } else {

                return {

                    nameValidator: { valid: true }
                };
            }
        } else {

            return null;
        }
    }
}
