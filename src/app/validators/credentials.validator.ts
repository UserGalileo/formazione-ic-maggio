import {ValidatorFn} from '@angular/forms';

export const credentialsValidator: ValidatorFn = control => {

  const firstname = control.get('firstname')?.value;
  const lastname = control.get('lastname')?.value;

  if (firstname === 'Mario' && lastname === 'Rossi') {
    return {
      credentialsValidator: true
    }
  }

  return null;
}
