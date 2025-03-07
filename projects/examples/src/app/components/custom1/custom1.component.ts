import { Component } from '@angular/core';
import { OmniSnippetsComponent } from '../../../../../ngx-snippets/src/public-api';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';
import { SnippetConfig } from '../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface';

@Component({
  selector: 'app-custom1',
  imports: [OmniSnippetsComponent],
  templateUrl: './custom1.component.html',
  styleUrl: './custom1.component.scss',
})
export class Custom1Component {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
