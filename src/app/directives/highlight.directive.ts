import {Directive, ElementRef, input} from '@angular/core';

// Attribute Directive
@Directive({
  selector: '[appHighlight]',
  host: {
     '(mouseenter)': 'highlight()',
     '(mouseleave)': 'dehighlight()'
  }
})
export class HighlightDirective {

  initialBackgroundColor = '';
  initialColor = '';

  appHighlight = input('yellow');
  textColor = input('black');

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initialBackgroundColor = this.el.nativeElement.style.backgroundColor;
    this.initialColor = this.el.nativeElement.style.color;
  }

  highlight() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
    this.el.nativeElement.style.color = this.textColor();
  }

  dehighlight() {
    this.el.nativeElement.style.backgroundColor = this.initialBackgroundColor;
    this.el.nativeElement.style.color = this.initialColor;
  }
}
