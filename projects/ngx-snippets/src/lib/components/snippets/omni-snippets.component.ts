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
import { CodeTokenizerDirective } from '../../directives/code-tokenizer.directive';
import {
  NgIf,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgStyle,
  NgClass,
  NgTemplateOutlet,
} from '@angular/common';
import { Effects, Formats } from '../../types';
import { TokenizerService } from '../../services/tokenizer.service';
import { CopyService } from '../../services/copy.service';
import { TemplateTokenizerDirective } from '../../directives/template-tokenizer.directive';
import { RecordForCopyDirective } from '../../directives/record-for-copy.directive';

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
    NgStyle,
    NgClass,
    NgTemplateOutlet,
  ],
  providers: [CopyService],
  templateUrl: './omni-snippets.component.html',
  styleUrls: [
    './omni-snippets.component.scss',
    '../../styles/defaults.scss',
    '../../styles/effects.scss',
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

  @Input() style!: { [key: string]: any };
  @Input() styleClass!: string;
  @Input() effects!: Effects;
  @Input() format: Formats = 'JavaScript';

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
