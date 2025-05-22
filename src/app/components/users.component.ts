import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-users',
  template: `

    <ul>
      @for (user of users; track user.id) {
        <li
          [style.font-weight]="selectedUserId === user.id ? 'bold' : 'normal'"
          [routerLink]="'' + user.id"
        >{{ user.username }}
        </li>
      }
    </ul>

    @if (selectedUserId !== null) {
      <h5>Posts:</h5>
    }

    <ul>
      @for (post of posts; track post.id) {
        <li>{{ post.title }}</li>
      }
    </ul>
  `,
  imports: [
    RouterLink
  ]
})
export class UsersComponent {
  http = inject(HttpClient);

  // Stati
  users: User[] = [];
  selectedUserId: User['id'] | null = null;
  posts: any[] = [];

  // Stato derivato
  get selectedUser() {
    return this.users.find(user => user.id === this.selectedUserId);
  }

  ngOnInit() {
    // Observable
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe(users => {
      this.users = users;
    });
  }

  selectUser(userId: User['id']) {
    this.selectedUserId = userId;

    this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts', {
      params: {
        userId: userId
      }
    }).subscribe(posts => {
      this.posts = posts;
    })
  }
}
