import {Component, inject} from '@angular/core';
import {FormControl, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {forbiddenValidator} from '../validators/forbidden.validator';
import {credentialsValidator} from '../validators/credentials.validator';

@Component({
  selector: 'app-reactive-form',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="firstname">
      <input formControlName="lastname">

      <div formGroupName="address">
        <input formControlName="city">
        <input formControlName="street">
      </div>

      <div formArrayName="phones">
        <h5>Phones:</h5>
        <button type="button" (click)="addPhone()">Add phone</button>

        @for (phone of form.controls.phones.controls; let i = $index; track phone) {
          <div>
            <input [formControlName]="i">
            <button type="button" (click)="removePhone(i)">Remove</button>
          </div>
        }
      </div>

      <hr>
      <button>Send</button>
    </form>


    <input type="radio" [formControl]="control" value="red"> Red
    <input type="radio" [formControl]="control" value="yellow"> Yellow
    <input type="radio" [formControl]="control" value="green"> Green

    <br> {{ control.value }}
  `
})
export class ReactiveFormComponent {

  fb = inject(NonNullableFormBuilder);

  control = this.fb.control<'red' | 'yellow' | 'green'>('red');

  form = this.fb.group({
    firstname: ['', forbiddenValidator('Michele')],
    lastname: '',
    address: this.fb.group({
      city: '',
      street: '',
    }),
    phones: this.fb.array<FormControl<string>>([])
  }, { validators: credentialsValidator });

  ngOnInit() {
    this.form.controls.firstname.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.form.controls.firstname.statusChanges.subscribe(value => {
      console.log(value);
    });

  }

  onSubmit() {
    this.form.controls.firstname.disable();
    console.log(this.form.getRawValue());
  }

  addPhone() {
    this.form.controls['phones'].push(
      this.fb.control('')
    );
  }

  removePhone(i: number) {
    this.form.controls['phones'].removeAt(i);
  }
}
