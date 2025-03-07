import { Component } from '@angular/core';
import { OmniSnippetsComponent, SnippetConfig } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';

@Component({
  selector: 'app-custom3',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom3.component.html',
  styleUrl: './custom3.component.scss',
})
export class Custom3Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
