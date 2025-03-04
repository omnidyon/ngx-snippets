import { SnippetConfig } from "../../../../../ngx-snippets/src/lib/interfaces/snippet-config.interface";

export const EXAMPLE_SNIPPETS: SnippetConfig[] = [
  {
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
    format: 'TypeScript',
  },
  {
    template: `
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
];
