import { Directive, Input, OnDestroy } from '@angular/core';
import { Formats } from '../../types';
import { Token } from '../../interfaces/token.interface';
import { BaseTokenizerDirective } from './base-tokenizer.directive';

@Directive({
  selector: '[codeTokenizer]',
})
export class CodeTokenizerDirective
  extends BaseTokenizerDirective
  implements OnDestroy
{
  lineCount!: number;

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

  ngOnDestroy(): void {
    this.unListeners.forEach((unListener) => unListener());
  }
}
