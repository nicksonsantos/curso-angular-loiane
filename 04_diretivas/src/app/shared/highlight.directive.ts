import { Directive, Input, ElementRef, Renderer2, HostBinding, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @Input('highlight') cor: string = '';

  @HostBinding('style.backgroundColor') backgroundColor = '#000000';

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) { }

  ngOnChanges(){
    this.backgroundColor = this.cor;
  }

}
