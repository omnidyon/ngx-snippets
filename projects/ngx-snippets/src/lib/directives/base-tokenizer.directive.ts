import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Token } from '../interfaces/token.interface';
import { lineSelect } from '../handlers/line-handler';

@Directive({
  selector: '[omniBaseTokenizer]',
})
 export abstract class BaseTokenizerDirective {
  self!: HTMLPreElement;
  abstract lineCount: number;
  unListeners: (() => void)[] = [];

  @Input() lineNumbers!: HTMLDivElement;

  constructor(
    public readonly elementRef: ElementRef,
    public readonly renderer: Renderer2
  ) {
    this.self = this.elementRef.nativeElement;
  }

  createSpan(token: Token): void {
    const span = this.renderer.createElement('span');
    this.renderer.setProperty(span, 'innerText', token.token);
    this.renderer.addClass(span, token.class);
    this.renderer.appendChild(this.self, span);
  }

  createNumberLine(token: Token): void {
    if (token.token === `\n`) {
      this.addNumberLine();
      this.lineCount++;
    }
  }

  addNumberLine(): void {
    const span = this.renderer.createElement('span');
    this.renderer.setProperty(span, 'innerText', this.lineCount);
    this.renderer.addClass(span, 'line-number');
    this.unListeners.push(
      this.renderer.listen(span, 'click', (event: Event) =>
        lineSelect(event, this.renderer)
      )
    );
    this.renderer.appendChild(this.lineNumbers, span);
  }

  clearNumberLines(): void {
    while (this.lineNumbers.firstChild) {
      this.renderer.removeChild(this.lineNumbers, this.lineNumbers.lastChild);
    }
  }

  // setSelected(element: Element[]): void {
  //   this.renderer.addClass(element, 'selected-element');
  // }
}
