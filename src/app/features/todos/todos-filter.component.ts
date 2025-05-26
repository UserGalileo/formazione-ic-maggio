import {Component, input, output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect, MatOption} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {TodosFilter} from '../../models/todo';

@Component({
  selector: 'app-todos-filter',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
  ],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Filter</mat-label>

      <mat-select [ngModel]="filter()" (ngModelChange)="filterChange.emit($event)">
        <mat-option [value]="'ALL'">All</mat-option>
        <mat-option [value]="'ACTIVE'">Active</mat-option>
        <mat-option [value]="'COMPLETED'">Completed</mat-option>
      </mat-select>
    </mat-form-field>
  `
})
export class TodosFilterComponent {
  filter = input<TodosFilter>('ALL');
  filterChange = output<TodosFilter>();
}
