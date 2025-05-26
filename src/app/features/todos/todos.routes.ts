import {TodosComponent} from './todos.component';
import {CanDeactivateFn, Routes} from '@angular/router';

export interface CanLeave {
  canLeave: () => boolean;
}

export const canLeave: CanDeactivateFn<CanLeave> = (component) => {
  return component.canLeave();
}

export default [
  {
    path: '',
    component: TodosComponent,
    canDeactivate: [canLeave]
  },
] satisfies Routes;
