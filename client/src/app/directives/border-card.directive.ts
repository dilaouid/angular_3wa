import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {

  @Input('appBorderCard') borderColor: string = '';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.border = `solid 1px ${this.borderColor}`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.border = "solid 1px rgba(0, 0, 0, 0.175)"
  }

}
