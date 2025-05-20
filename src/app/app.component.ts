import {Component} from '@angular/core';
import {CounterComponent} from './counter.component';

// Lifting state up
@Component({
  selector: 'app-root',
  imports: [CounterComponent],
  template: `
    <p>Hello World!</p>

    <app-counter [(value)]="count" />
  `,
})
export class AppComponent {

  count = 0;
}
