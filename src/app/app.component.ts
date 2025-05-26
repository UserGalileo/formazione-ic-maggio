import {
  Component,
  viewChild,
  ElementRef
} from '@angular/core';
import {CounterComponent} from './components/counter.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CounterComponent,
  ],
  template: `
<!--    <nav>-->
<!--      <ul>-->
<!--        <li><a routerLink="/counter">Counter</a></li>-->
<!--        <li><a routerLink="/users">Users</a></li>-->
<!--        <li><a routerLink="/todos">Todos</a></li>-->
<!--      </ul>-->
<!--    </nav>-->

    <app-counter />
  `,
  styles: `
    :host {
      padding: 10px;
      display: block;
    }
  `,
})
export class AppComponent {

  counter = viewChild(CounterComponent, { read: ElementRef });

  constructor() {}

  ngAfterViewInit() {
    console.log(this.counter());
  }
}

// - signal ------- Stati
// - computed ----- Stati derivati
// - effect ------- Effetti
// - input
// - model
// - viewChild, viewChildren
// - contentChild, contentChildren
