import {Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserComponent} from './user.component';

export default [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: ':userId',
        component: UserComponent
      },
    ]
  },
] satisfies Routes;
