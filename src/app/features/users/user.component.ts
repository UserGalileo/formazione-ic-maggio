import {Component, inject, input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [
    JsonPipe
  ],
  template: `
    User {{ userId() }} <br>

    {{ user() | json }}
  `
})
export class UserComponent {

  http = inject(HttpClient);

  userId = input.required<string>();

  // Stato derivato asincrono
  user = toSignal(toObservable(this.userId).pipe(
    switchMap(id => this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`))
  ));
}
