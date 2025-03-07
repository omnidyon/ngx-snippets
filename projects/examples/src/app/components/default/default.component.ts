import { Component } from '@angular/core';
import { EXAMPLE_SNIPPETS } from '../main/example-snippets';
import { SnippetConfig } from '../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface';
import { OmniSnippetsComponent } from '../../../../../ngx-snippets/src/public-api';

@Component({
  selector: 'app-default',
  imports: [OmniSnippetsComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
