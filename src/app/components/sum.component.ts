import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

// Stateless (Presentational) (Dumb)
@Component({
  selector: 'app-sum',
  template: `{{ sum() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SumComponent {

  // Stati (dall'esterno)
  a = input(0);
  b = input(0);

  // Stato derivato
  sum = computed(() => this.a() + this.b());
}
