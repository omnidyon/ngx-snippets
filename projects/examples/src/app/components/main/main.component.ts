import { Component } from '@angular/core';
import { NgxSnippetsComponent } from 'ngx-snippets';
import { EXAMPLE_SNIPPETS } from './example-snippets';
import { SnippetConfig } from '../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface';

@Component({
  selector: 'app-main',
  imports: [NgxSnippetsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
