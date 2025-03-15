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
  runningLine!: HTMLDialogElement;
  lineCount: number = 1;
  lineNumber: number = 1;
  unListeners: (() => void)[] = [];

  @Input() lineNumbers!: HTMLDivElement;

  constructor(
    public readonly elementRef: ElementRef,
    public readonly renderer: Renderer2,
    public readonly copyService: CopyService,
    public readonly viewContainer: ViewContainerRef
  ) {
    this.self = this.elementRef.nativeElement;
    this.createLine();
  }

  handleToken(token: Token): void {
    if (token.token === `\n`) {
      if (this.runningLine.children.length === 0) {
        this.renderer.setProperty(this.runningLine, 'innerHTML', `\n`);
      }
      
      this.createLine();
      this.addNumberLine();
      this.lineNumber++;
    } else {
      this.createSpan(token);
    }
  }

  createSpan(token: Token): void {
    if (token.token !== `\n` && token.token) {
      const span = this.renderer.createElement('span');
      this.renderer.setProperty(span, 'innerText', token.token);
      this.renderer.addClass(span, token.class);
      this.renderer.appendChild(this.runningLine, span);
    }
  }

  addNumberLine(): void {
    const numberLine = this.viewContainer.createComponent(NumberLineComponent);
    numberLine.setInput('number', this.lineNumber);
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

  createLine(): void {
    this.runningLine = this.renderer.createElement('div');
    this.renderer.setAttribute(this.runningLine, 'row-num', this.lineCount.toString());
    this.renderer.addClass(this.runningLine, 'line');
    this.renderer.appendChild(this.self, this.runningLine);
    this.lineCount++;
  }
}
