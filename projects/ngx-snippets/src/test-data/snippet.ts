import { SnippetConfig } from "../lib/interfaces/snippet-config.interface";

export const TEST_SNIPPET: SnippetConfig = {
  template: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: \`
      <h1>Hello world!</h1>
  \`,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'homes';
}
`,
  format: 'JavaScript',
};
