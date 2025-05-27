import {Component, viewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    JsonPipe
  ],
  template: `
    <form #form="ngForm" (ngSubmit)="onSubmit(form)">
      <input name="firstname" ngModel required forbidden="Michele">
      <input name="lastname" ngModel>

      <ng-container ngModelGroup="address">
        <input name="city" ngModel>
        <input name="street" ngModel>
      </ng-container>

      <button>Invio</button>
    </form>

    {{ form.value | json }}
  `
})
export class FormComponent {

  ngForm = viewChild(NgForm);

  ngAfterViewInit() {
    this.ngForm()?.form.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  onSubmit(form: NgForm) {}
}
