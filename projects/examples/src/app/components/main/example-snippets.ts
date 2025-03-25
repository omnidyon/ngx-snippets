import { SnippetConfig } from "../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface";

export const EXAMPLE_SNIPPETS: SnippetConfig[] = [
  {
    template: `
/**
 *  Comment example
 */

import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    imports: [],
    template: \`
        <h1>Hello world!</h1>
    \`,
    styleUrls: ['./app.component.css'],
})

// Comment example
export class AppComponent {
    title = 'homes';
}
`,
    format: 'TypeScript',
  },
  {
    template: `
<!-- Comment Example -->
<main>
    <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
    </header>
    <section class="content">
        <app-home></app-home>
    </section>
</main>
`,
    format: 'HTML',
  },
  {
    template: `
.snippets-header {
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-end;
  background-color: var(--snippet-header-background-color) !important;
  border-radius: var(--snippet-border-radius) var(--snippet-border-radius) 0 0;
  font-size: var(--snippets-header-font-size);

  .snippet-tab {
    padding: 5px;
    border-radius: 0px 0px var(--snippet-tab-border-radius) var(--snippet-tab-border-radius);
    color: var(--snippet-header-text-color);
    cursor: pointer;

    &:hover {
      filter: brightness(150%);
      backdrop-filter: brightness(60%);
    }
  }
}
    `,
    format: 'CSS'
  }
];
