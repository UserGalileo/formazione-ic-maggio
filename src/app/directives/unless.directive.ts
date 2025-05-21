import {Directive, inject, input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[unless]',
})
export class UnlessDirective {

  templateRef = inject(TemplateRef<any>);
  viewContainer = inject(ViewContainerRef);

  private hasView = false;

  unless = input(true);

  ngOnChanges() {
    if (!this.unless() && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.unless() && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
