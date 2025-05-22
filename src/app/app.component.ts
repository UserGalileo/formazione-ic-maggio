import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/counter">Counter</a></li>
        <li><a routerLink="/users">Users</a></li>
        <li><a routerLink="/todos">Todos</a></li>
      </ul>
    </nav>

    <hr>

    <router-outlet />
  `,
  styles: `
    :host {
      padding: 10px;
      display: block;
    }
  `
})
export class AppComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {

  }

}
