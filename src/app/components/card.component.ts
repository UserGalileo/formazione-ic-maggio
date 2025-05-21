import {Component} from '@angular/core';

// Content Projection
@Component({
  selector: 'app-card',
  template: `
    <ng-content select=".card-title" />

    <hr>

    <ng-content select=".card-body" />

    <hr>

    <ng-content />
  `,
  styles: `
    :host {
      border: 2px solid rgba(0,0,0,.2);
      background: rgba(0,0,0,.05);
      border-radius: 5px;
      padding: 10px;
      display: block;
    }
  `
})
export class CardComponent {}
