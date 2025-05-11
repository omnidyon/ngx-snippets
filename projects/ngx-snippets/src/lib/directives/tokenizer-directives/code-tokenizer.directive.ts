/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import { Directive, Input, OnDestroy } from '@angular/core';
import { Formats } from '../../types';
import { Token } from '../../interfaces/token.interface';
import { CodeHandlerDirective } from '../code-handler/code-handler.directive';

/**
 * @internal
 * @description
 * A directive responsible for handling snippets passed a snippets input
 * The {@link OmniSnippetsComponent} preforms the token classification and
 * passes the tokens to this directives for further handling
 */
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
