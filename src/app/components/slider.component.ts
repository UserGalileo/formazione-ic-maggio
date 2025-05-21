import {Component, input, model} from '@angular/core';


@Component({
  selector: 'app-slider',
  template: `
    <div class="slidecontainer">
      <input type="range" min="1" max="100" [value]="value()" (input)="onInput($event)" class="slider">
      <p>Value: <span>{{ value() }}</span></p>
    </div>
  `,
  styles: `
    .slidecontainer {
      width: 100%;
    }

    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 15px;
      border-radius: 5px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }

    .slider:hover {
      opacity: 1;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04AA6D;
      cursor: pointer;
    }

    .slider::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #04AA6D;
      cursor: pointer;
    }
  `,
  host: {
    'role': 'slider', // attributo con stringa fissa
    '[attr.aria-valuenow]': 'value()', // attributo variabile
    '[tabIndex]': "disabled() ? -1 : 0", // proprietà variabile
  }
})
export class SliderComponent {

  value = model(0);

  disabled = input(false);

  onInput(e: Event) {
    this.value.set(+(e.target as HTMLInputElement)?.value);
  }

}
