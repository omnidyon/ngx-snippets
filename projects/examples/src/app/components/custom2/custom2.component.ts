import { Component } from '@angular/core';
import { OmniSnippetsComponent, SnippetConfig } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';

@Component({
  selector: 'app-custom2',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom2.component.html',
  styleUrl: './custom2.component.scss',
})
export class Custom2Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
