import { Component } from '@angular/core';
import { OmniSnippetsComponent, SnippetConfig } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';

@Component({
  selector: 'app-custom4',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom4.component.html',
  styleUrl: './custom4.component.scss',
})
export class Custom4Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
