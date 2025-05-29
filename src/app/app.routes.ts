import {CanActivateFn, Routes} from '@angular/router';
import {CounterComponent} from './components/counter.component';

// Guard - Injection Context
export const adminGuard: CanActivateFn = () => {
  return true;
}

export const routes: Routes = [
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes')
  },
  {
    path: 'invoices',
    loadChildren: () => import('./features/invoices/invoices.routes')
  },
  {
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.routes'),
    canMatch: [adminGuard],
  },
  {
    path: '',
    redirectTo: '/invoices',
    pathMatch: 'full'
  }
];


