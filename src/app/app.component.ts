import {Component, inject} from '@angular/core';
import {HighlightDirective} from './directives/highlight.directive';
import {LoggerService} from './services/logger.service';
import {CounterComponent} from './components/counter.component';

@Component({
  selector: 'app-root',
  imports: [HighlightDirective, CounterComponent],
  template: `
    <p appHighlight>Hello World!</p>

    <app-counter />
  `,
})
export class AppComponent {

  logger = inject(LoggerService);
}
