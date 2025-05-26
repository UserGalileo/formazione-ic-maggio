import {Component, signal, computed} from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ doubleCount() }}</p>

    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
})
export class CounterComponent {

  // Stato
  count = signal(0);

  // Stato derivato
  doubleCount = computed(() => this.count() * 2);

  inc() {
    this.count.update(n => n + 1);
  }

  dec() {
    this.count.update(n => n - 1);
  }

}
