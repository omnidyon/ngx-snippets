import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Token } from '../../interfaces/token.interface';
import { CodeHandlerDirective } from '../code-handler/code-handler.directive';
import { Formats } from '../../types';
import { TokenizerService } from '../../services/tokenizer.service';
import { CopyService } from '../../services/copy.service';

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
