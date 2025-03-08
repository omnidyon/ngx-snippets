import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Token } from '../interfaces/token.interface';
import { BaseTokenizerDirective } from './base-tokenizer.directive';
import { Formats } from '../types';
import { TokenizerService } from '../services/tokenizer.service';

@Directive({
  selector: '[templateTokenizer]',
})
export class TemplateTokenizerDirective
  extends BaseTokenizerDirective
  implements AfterViewInit, OnDestroy
{
  classifiedTokens: Token[] = [];
  override lineCount: number = 1;

  @Input() format!: Formats;

  constructor(
    public override readonly elementRef: ElementRef,
    public override readonly renderer: Renderer2,
    private tokenizerService: TokenizerService
  ) {
    super(elementRef, renderer);
  }

  ngAfterViewInit(): void {
    this.classifiedTokens = this.tokenizerService.tokenize(
      this.self.innerText,
      this.format
    );
    this.self.innerText = '';
    this.classifiedTokens.forEach((token) => {
      this.createNumberLine(token);
      this.createSpan(token);
    });
    this.addNumberLine();
  }

  ngOnDestroy(): void {
    this.unListeners.forEach((unListener) => unListener());
  }
}
