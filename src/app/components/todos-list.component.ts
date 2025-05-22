import {Component, input, output} from '@angular/core';
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {Todo} from '../models/todo';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-todos-list',
  imports: [
    MatList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    MatIcon,
    MatIconButton,
    MatCheckbox,
    FormsModule,
  ],
  template: `
    <mat-list>
      <div mat-subheader>Todos</div>

      @for (todo of todos(); track todo.id) {
        <mat-list-item>
          <span>{{ todo.text }}</span>
          <button mat-icon-button (click)="removeTodo.emit(todo.id)">
            <mat-icon>delete</mat-icon>
          </button>

          <mat-checkbox [ngModel]="todo.completed" (ngModelChange)="toggleCompleted.emit(todo.id)" />
        </mat-list-item>
      }

    </mat-list>
  `
})
export class TodosListComponent {
  todos = input<Todo[]>([]);

  toggleCompleted = output<Todo['id']>();
  removeTodo = output<Todo['id']>();
}
