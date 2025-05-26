import {CanActivateFn, Routes} from '@angular/router';
import {CounterComponent} from './components/counter.component';
import {LoggerService} from './services/logger.service';

// Guard - Injection Context
export const adminGuard: CanActivateFn = () => {
  console.log('admin guard');
  return true;
}

// CanActivate: Se l'utente può vedere la pagina
// CanActivateChild: Se l'utente può vedere la pagina E i suoi figli
// CanLoad: Se il chunk va caricato
// CanMatch: La rotta è valida?
// CanDeactivate: L'utente può lasciare la pagina?

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
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.routes'),
    canMatch: [adminGuard],
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];


