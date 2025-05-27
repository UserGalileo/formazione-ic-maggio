// Factory function
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive, input} from '@angular/core';

export function forbiddenValidator(forbiddenValue: any) {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value !== forbiddenValue ? null : {
      forbidden: `${forbiddenValue} is not allowed here.`
    }
  }
}

// Esempi di validatori creati con la factory
const noMicheleValidator = forbiddenValidator('Michele');
const noFabioValidator = forbiddenValidator('Fabio');
const noMarioValidator = forbiddenValidator('Mario');

@Directive({
  selector: '[forbidden]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true
    }
  ]
})
export class ForbiddenValidatorDirective implements Validator {

  forbidden = input.required<string>();

  validate(control: AbstractControl): ValidationErrors | null {
    return forbiddenValidator(this.forbidden())(control);
  }
}
