import {Component} from '@angular/core';
import {TodosFilterComponent} from './todos-filter.component';
import {TodosFormComponent} from './todos-form.component';
import {TodosListComponent} from './todos-list.component';
import {Todo, TodosFilter} from '../../models/todo';
import {CanLeave} from './todos.routes';

@Component({
  selector: 'app-todos',
  imports: [
    TodosFilterComponent,
    TodosFormComponent,
    TodosListComponent,
  ],
  template: `
    <app-todos-filter
        [(filter)]="filter"
    />

    <app-todos-form
        [(todoText)]="todoText"
        (addTodo)="onAddTodo()"
    />

    <app-todos-list
        [todos]="filteredTodos"
        (removeTodo)="onRemoveTodo($event)"
        (toggleCompleted)="onToggleCompleted($event)"
    />
  `,
})
export class TodosComponent implements CanLeave {

  // Stati
  todos: Todo[] = [];
  filter: TodosFilter = 'ALL';
  todoText = '';

  // Stato derivato
  get filteredTodos() {
    if (this.filter === 'COMPLETED') {
      return this.todos.filter(todo => todo.completed);
    }
    if (this.filter === 'ACTIVE') {
      return this.todos.filter(todo => !todo.completed);
    }
    return this.todos;
  }

  onAddTodo() {
    const newTodo = { id: '' + Math.random(), text: this.todoText, completed: false };
    this.todos = [ ...this.todos, newTodo ];
  }

  onRemoveTodo(id: Todo['id']) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  onToggleCompleted(id: Todo['id']) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
  }

  canLeave() {
    if (this.todoText) {
      return confirm('Are you sure you want to leave?');
    }
    return true;
  }
}

