import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
    <ul>
      @for (user of users; track user.id) {
        <li [routerLink]="'' + user.id">
          {{ user.username }}
        </li>
      }
    </ul>

    <router-outlet />
  `,
  imports: [
    RouterLink,
    RouterOutlet
  ]
})
export class UsersComponent {
  http = inject(HttpClient);

  users: User[] = [];

  ngOnInit() {
    // Observable
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(users => {
      this.users = users;
    });
  }
}
