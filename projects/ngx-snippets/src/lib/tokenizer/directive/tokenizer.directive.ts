import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Formats } from '../../types';
import { Token } from '../../interfaces/token.interface';

@Directive({
  selector: '[codeTokenizer]'
})
export class TokenizerDirective {
  self!: HTMLPreElement;
  lineCount!: number;
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
  };

  constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
    this.self = this.elementRef.nativeElement;
  }

  createSpan(token: Token): void {
    const span = this.renderer.createElement('span');
    this.renderer.setProperty(span, 'innerText', token.token);
    this.renderer.addClass(span, token.class);
    this.renderer.appendChild(this.self, span);
  }

  createNumberLine(token: Token): void {
    if(token.token === `\n`) {
      this.addNumberLine();
      this.lineCount++;
    }
  }

  addNumberLine(): void {
    const span = this.renderer.createElement('span');
    this.renderer.setProperty(span, 'innerText', this.lineCount);
    this.renderer.addClass(span, 'line-number');
    this.renderer.appendChild(this.lineNumbers, span);
  }

  clearNumberLines(): void {
    while(this.lineNumbers.firstChild) {
      this.renderer.removeChild(this.lineNumbers, this.lineNumbers.lastChild);
    }
  }
}
