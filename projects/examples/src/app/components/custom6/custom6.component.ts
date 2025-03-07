import { Component } from '@angular/core';
import { OmniSnippetsComponent, SnippetConfig } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';

@Component({
  selector: 'app-custom6',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom6.component.html',
  styleUrl: './custom6.component.scss',
})
export class Custom6Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
