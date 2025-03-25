import { Directive, Input, OnDestroy } from '@angular/core';
import { Formats } from '../../types';
import { Token } from '../../interfaces/token.interface';
import { CodeHandlerDirective } from '../code-handler/code-handler.directive';

@Directive({
  selector: '[codeTokenizer]',
})
export class CodeTokenizerDirective
  extends CodeHandlerDirective
  implements OnDestroy
{
  @Input() format: Formats = 'TypeScript';
  @Input() set tokens(tokens: Token[]) {
    this.clearNumberLines();
    tokens.forEach((token) => {
      this.handleToken(token);
    });
    this.addNumberLine();
  }
}
