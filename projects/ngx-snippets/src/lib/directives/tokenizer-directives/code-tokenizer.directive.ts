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
  @Input() format: Formats = 'TypeScript';
  @Input() set tokens(tokens: Token[]) {
    this.clearNumberLines();
    tokens.forEach((token, i) => {
      this. handleToken(token);
    });
    this.addNumberLine();
  }
}
