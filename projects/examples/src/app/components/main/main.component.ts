import { Component } from '@angular/core';
import { EXAMPLE_SNIPPETS } from './example-snippets';
import { SnippetConfig } from '../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface';
import { DefaultComponent } from '../default/default.component';
import { Custom1Component } from '../custom1/custom1.component';
import { Custom2Component } from '../custom2/custom2.component';
import { Custom3Component } from '../custom3/custom3.component';
import { Custom4Component } from '../custom4/custom4.component';
import { Custom5Component } from '../custom5/custom5.component';
import { Custom6Component } from '../custom6/custom6.component';
import { Custom7Component } from '../custom7/custom7.component';
import { Custom8Component } from '../custom8/custom8.component';

@Component({
  selector: 'app-main',
  imports: [
    DefaultComponent,
    Custom1Component,
    Custom2Component,
    Custom3Component,
    Custom4Component,
    Custom5Component,
    Custom6Component,
    Custom7Component,
    Custom8Component
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  exampleSnippets: SnippetConfig[] = EXAMPLE_SNIPPETS;
}
