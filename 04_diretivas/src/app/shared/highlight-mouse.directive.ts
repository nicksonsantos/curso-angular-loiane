import { Directive, Renderer2, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: 'p[highlightMouse]',
})
export class HighlightMouseDirective {
  @HostListener('mouseenter') onMouseOver() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'font-weight', 'bold')
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this._renderer.setStyle(this._elementRef.nativeElement, 'font-weight', 'normal')
    this.fontWeight = 'normal';
  }

  // @HostBinding('style.fontWeight') fontWeight: string = 'normal';
  @HostBinding('style.fontWeight') get setFontWeight() {
    return this.fontWeight;
  }
  private fontWeight: string = 'normal';

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}
}
