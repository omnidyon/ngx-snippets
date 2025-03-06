import { Component } from '@angular/core';
import { OmniSnippetsComponent } from 'ngx-snippets';
import { EXAMPLE_SNIPPETS } from './example-snippets';
import { SnippetConfig } from '../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface';

@Component({
  selector: 'app-main',
  imports: [OmniSnippetsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
