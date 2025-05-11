/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import {
  AfterViewInit,
  Directive,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { Token } from '../../interfaces/token.interface';
import { CodeHandlerDirective } from '../code-handler/code-handler.directive';
import { Formats } from '../../types';
import { TokenizerService } from '../../services/tokenizer.service';


/**
 * @internal
 * @description
 * A directive responsible for handling snippets passed through an ng-template
 *
 * For more information on ng-template please visit: https://angular.dev/api/core/ng-template
 */
@Directive({
  selector: '[templateTokenizer]',
})
export class TemplateTokenizerDirective
  extends CodeHandlerDirective
  implements AfterViewInit, OnDestroy
{
  classifiedTokens: Token[] = [];

  @Input() format!: Formats;

  private readonly tokenizerService = inject(TokenizerService);

  ngAfterViewInit(): void {
    this.classifiedTokens = this.tokenizerService.tokenize(
      this.self.innerText,
      this.format
    );
    this.self.innerText = '';
    this.classifiedTokens.forEach((token) => {
      this.handleToken(token);
    });
    this.addNumberLine();
  }
}
