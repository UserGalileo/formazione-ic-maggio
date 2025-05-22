import {Component, inject, input} from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [
    JsonPipe
  ],
  template: `
    User {{ userId() }} <br>

    {{ user | json }}
  `
})
export class UserComponent {

  http = inject(HttpClient);

  userId = input.required<string>();

  user: User | null = null;

  ngOnChanges() {
    this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + this.userId()).subscribe(user => {
      this.user = user;
    });
  }
}
