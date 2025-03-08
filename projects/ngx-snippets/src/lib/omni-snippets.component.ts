import { Component, Input } from '@angular/core';
import { SnippetConfig } from './interfaces/snippet-config.interface';
import { TokenizerService } from './tokenizer/service/tokenizer.service';
import { Token } from './interfaces/token.interface';
import { TokenizerDirective } from './tokenizer/directive/tokenizer.directive';
import { NgIf, NgFor, NgSwitch, NgSwitchCase, NgStyle, NgClass } from '@angular/common';
import { Effects } from './types';

@Component({
  selector: 'omni-snippets',
  imports: [TokenizerDirective, NgIf, NgFor, NgSwitch, NgSwitchCase, NgStyle, NgClass],
  templateUrl: './omni-snippets.component.html',
  styleUrls: [
    './omni-snippets.component.scss',
    './styles/defaults.scss',
    './styles/effects.scss'
  ],
})
export class OmniSnippetsComponent {
  _snippets!: SnippetConfig[];
  snippetToCopy: string = '';
  tab: string = 'TypeScript';
  classifiedTokens: Token[][] = [];

  constructor(private tokenizerService: TokenizerService) {}

  @Input() style!: { [key: string]: any };
  @Input() styleClass!: string;
  @Input() effects!: Effects;
  @Input() set snippets(snippets: SnippetConfig[]) {
    this._snippets = snippets;
    this.tab = snippets[0].format;
    this.snippetToCopy = snippets[0].template;
    snippets.forEach((snippet) => {
      this.classifiedTokens.push(
        this.tokenizerService.tokenize(snippet.template, snippet.format)
      );
    });
  }

  switchSnippet(tab: string, i: number): void {
    this.tab = tab;
    this.snippetToCopy = this._snippets[i].template;
  }

  copySnippet(): void {
    navigator.clipboard.writeText(this.snippetToCopy);
  }
}
