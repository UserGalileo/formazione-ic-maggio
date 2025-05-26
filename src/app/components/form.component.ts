import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule
  ],
  template: `
    <input type="text" [(ngModel)]="control">
  `
})
export class FormComponent {
  control = '';
}
