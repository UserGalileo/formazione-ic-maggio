import { Routes } from '@angular/router';
import {CounterComponent} from './components/counter.component';
import {UsersComponent} from './components/users.component';
import {TodosComponent} from './components/todos.component';
import {UserComponent} from './components/user.component';


export const routes: Routes = [
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:userId',
    component: UserComponent
  },
  {
    path: 'todos',
    component: TodosComponent,
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];


