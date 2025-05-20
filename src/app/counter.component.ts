import {Component, input, output} from '@angular/core';

// Componente Stateless
@Component({
  selector: 'app-counter',
  template: `
    <p>{{ value() }}</p>

    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
})
export class CounterComponent {

  value = input(0);

  valueChange = output<number>();

  inc() {
    this.valueChange.emit(this.value() + 1);
  }

  dec() {
    this.valueChange.emit(this.value() - 1);
  }
}
