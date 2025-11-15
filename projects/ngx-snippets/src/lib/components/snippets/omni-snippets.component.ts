/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import {
  Component,
  ContentChild,
  Host,
  Input,
  Self,
  TemplateRef,
} from '@angular/core';
import { SnippetConfig } from '../../interfaces/snippet-config.interface';
import { Token } from '../../interfaces/token.interface';
import { CodeTokenizerDirective } from '../../directives/tokenizer-directives/code-tokenizer.directive';
import {
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgClass,
  NgTemplateOutlet,
} from '@angular/common';
import { Backlights, Formats, Neons } from '../../types';
import { TokenizerService } from '../../services/tokenizer.service';
import { CopyService } from '../../services/copy.service';
import { TemplateTokenizerDirective } from '../../directives/tokenizer-directives/template-tokenizer.directive';
import { RecordForCopyDirective } from '../../directives/copy/record-for-copy.directive';


/**
 * @publicApi
 * @description
 * The main component of the library, the actually snippets are being shown from this
 * components view.
 *
 * @usageNotes
 * <omni-snippets
 *  [snippets]="exampleSnippets"  -{@link SnippetConfig}
 *  backlight="backlight-Green"   -{@link Backlights}  effect applied to the snippet
 * ></omni-snippets>
 */
@Component({
  selector: 'omni-snippets',
  imports: [
    CodeTokenizerDirective,
    TemplateTokenizerDirective,
    RecordForCopyDirective,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    NgTemplateOutlet,
  ],
  providers: [CopyService],
  templateUrl: './omni-snippets.component.html',
  styleUrls: [
    './omni-snippets.component.scss',
    '../../styles/defaults.scss',
    '../../styles/tokens.scss',
    '../../styles/backlight.scss',
    '../../styles/neon.scss'
  ],
})
export class OmniSnippetsComponent {
  _snippets!: SnippetConfig[];
  tab: string = 'TypeScript';
  classifiedTokens: Token[][] = [];

  @ContentChild(TemplateRef) template!: TemplateRef<any>;

  constructor(
    private tokenizerService: TokenizerService,
    @Host() @Self() private copyService: CopyService
  ) {}

  @Input() backlight!: Backlights | null;
  @Input() neon!: Neons;
  @Input() format: Formats = 'JavaScript';
  @Input() header: boolean = true;

  @Input() set snippets(snippets: SnippetConfig[]) {
    this._snippets = snippets;
    this.tab = snippets[0].format;
    this.copyService.set(snippets[0].template);
    snippets.forEach((snippet) => {
      this.classifiedTokens.push(
        this.tokenizerService.tokenize(snippet.template, snippet.format)
      );
    });
  }

  switchSnippet(tab: string, i: number): void {
    this.tab = tab;
    this.copyService.set(this._snippets[i].template);
  }

  copySnippet(): void {
    this.copyService.toClipboard();
  }
}
