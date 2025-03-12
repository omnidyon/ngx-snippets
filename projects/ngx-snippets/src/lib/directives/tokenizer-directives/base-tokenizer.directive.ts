import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Token } from '../../interfaces/token.interface';
import { CopyService } from '../../services/copy.service';
import { NumberLineComponent } from '../../components/number-line/number-line.component';

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
    public readonly renderer: Renderer2,
    public readonly copyService: CopyService,
    public readonly viewContainer: ViewContainerRef
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
    const numberLine = this.viewContainer.createComponent(NumberLineComponent);
    numberLine.setInput('number', this.lineCount);
    this.renderer.addClass(numberLine.location.nativeElement, 'gutter-item');
    this.renderer.appendChild(
      this.lineNumbers,
      numberLine.location.nativeElement
    );
  }

  clearNumberLines(): void {
    while (this.lineNumbers.firstChild) {
      this.renderer.removeChild(this.lineNumbers, this.lineNumbers.lastChild);
    }
  }
}
