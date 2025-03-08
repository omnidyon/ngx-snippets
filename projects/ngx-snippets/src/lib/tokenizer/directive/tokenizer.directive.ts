import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Formats } from '../../types';
import { Token } from '../../interfaces/token.interface';
import { lineSelect } from '../../utils/line-handler';

@Directive({
  selector: '[codeTokenizer]',
})
export class TokenizerDirective implements OnDestroy {
  self!: HTMLPreElement;
  lineCount!: number;
  unListeners: (() => void)[] = [];

  @Input() lineNumbers!: HTMLDivElement;
  @Input() format: Formats = 'TypeScript';
  @Input() set tokens(tokens: Token[]) {
    this.lineCount = 1;
    this.clearNumberLines();
    tokens.forEach((token, i) => {
      this.createNumberLine(token);
      this.createSpan(token);
    });
    this.addNumberLine();
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    this.self = this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    this.unListeners.forEach((unListener) => unListener());
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

  setSelected(element: Element[]): void {
    this.renderer.addClass(element, 'selected-element');
  }
}
