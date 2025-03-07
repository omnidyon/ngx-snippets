import { Component } from '@angular/core';
import { OmniSnippetsComponent, SnippetConfig } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';

@Component({
  selector: 'app-custom8',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom8.component.html',
  styleUrl: './custom8.component.scss',
})
export class Custom8Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
