import {Component, model} from '@angular/core';

// Componente Stateful (comandabile dall'esterno)
@Component({
  selector: 'app-counter',
  template: `
    <p>{{ value() }}</p>

    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
})
export class CounterComponent {

  value = model(0);

  inc() {
    this.value.update(n => n + 1);
  }

  dec() {
    this.value.update(n => n - 1);
  }
}
