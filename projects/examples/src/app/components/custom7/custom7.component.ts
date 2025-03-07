import { Component } from '@angular/core';
import { OmniSnippetsComponent, SnippetConfig } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';

@Component({
  selector: 'app-custom7',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom7.component.html',
  styleUrl: './custom7.component.scss',
})
export class Custom7Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
