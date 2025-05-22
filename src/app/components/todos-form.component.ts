import {Component, output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todos-form',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
  ],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Add todo...</mat-label>
      <input matInput [(ngModel)]="todoText" (keyup.enter)="add()">
    </mat-form-field>
  `
})
export class TodosFormComponent {

  todoText = '';

  addTodo = output<string>();

  add() {
    this.addTodo.emit(this.todoText);
    this.todoText = '';
  }
}
