<div align="center">
  <!-- <img height="60" src="https://img.icons8.com/color/344/javascript.png"> -->
  <h1>Ngx Snippets</h1>
</div>

<p align="center">
An Angular library for adding code snippets top you application. It's easy to use, flexible and lightweight.
</p>

<p align="center"><b>Feel free to use it in a project and have fun with it!<b></p>

---

<details><summary><b style="font-size: 20px;">Installing</b></summary>
<p>
To add the library to your project run the following command from the root of the project:

```bash
npm install @omnidyon/ngx-snippets
```

</p>
</details>

---

<details><summary><b style="font-size: 20px;">Usage Examples</b></summary>
<p>
You can use the snippets in two ways.

Ether by passing it a snippet config array (see: [Snippet Config](#snippet_config)):

```javascript
<omni-snippets [snippets]="[exampleSnippets[0]]"></omni-snippets>
```

Or by providing the snippet in a template:

```javascript
  <omni-snippets >
    <ng-template>
      {{`import { SomeClass } from 'some-file';\nexport class SomeOtherClass {\n\tproperty = 0\n\n\tdoSomething() {\n\t\treturn "did it";\n\t}\n}`}}
    </ng-template>
  </omni-snippets>
```

> [!NOTE]  
> When providing a snippet in a template make sure that proper new liner(\n), tab(\t) indentation are provided
> as ngx snippets does not format the code, instead it provides code token recognition and styling.
> so code formatting is on the developer to handle.

</p>
</details>

---

<details><summary><b style="font-size: 20px;">Snippet Config</b></summary>
<p>

<a name="snippet_config"></a>

SnippetConfig is an interface defining snippets configuration

```javascript
interface SnippetConfig {
  template: string;
  format: "JavaScript" | "TypeScript" | "HTML" | "CSS";
}
```

Config Example:

```javascript
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
}
```

</p>
</details>

---

<details><summary><b style="font-size: 20px;">Styling</b></summary>
<p>
When installed the snippets will come in a default style.

But you we can custom style them simply by defining desired values.

Here is a list of values we can change to custom style and there meanings

| Variable Name                     | Meaning                           | Default value |
| --------------------------------- | --------------------------------- | ------------- |
| --snippet-font-size               | font size of the code             | 13px          |
| --snippets-header-font-size       | header tab font size              | 12px          |
| --snippet-letter-spacing          | code letter spacing               | 1px           |
| --snippet-border-radius           | snippet corner radius             | 5px           |
| --snippet-tab-border-radius       | lower corner radius for tabs      | 2px           |
| --snippets-gutter-width           | number lines width                | 72px          |
| --snippets-scrollbar-width        | scroll bar vertical width         | 5px           |
| --snippets-scrollbar-height       | scroll bar horizontal width       | 5px           |
| --snippet-background-color        | main background color             | #202836     |
| --snippet-header-background-color | header background color           | #1a212b     |
| --snippet-header-text-color       | header text color                 | #61789e     |
| --number-line-highlight-color     | color of the number when selected | #38e9ae     |
| --number-line-hover-color         | color of the number when hovered  | #07cc8a     |
| --ka-token-color                  | Keyword group A color             | #e1955d     |
| --kb-token-color                  | Keyword group B color             | #ff8c5f     |
| --kc-token-color                  | Keyword group C color             | #22e2b8     |
| --quoted-token-color              | quotes and quoted text color      | #34ec71     |
| --data-token-color                | color of data type tokens         | #a98adf     |
| --function-token-color            | color of function names           | #44b7ff     |
| --separator-token-color           | color of , : ;                    | #676e70     |
| --property-token-color            | property name token color         | #ff8c5f     |
| --operator-token-color            | color of operator tokens          | #f8c49e     |
| --parameter-token-color           | color of parameter tokens         | #f371a6     |
| --var-token-color                 | color of variable tokens          | #cfddd2     |
| --comment-token-color             | color of comments                 | gray          |
| --text-token-color                | color of remaining tokens         | lightgray     |
| --element-token-color             | html element name color           | salmon        |
| --attribute-color                 | html attribute color              | #ffd255     |
| --special-char-token-color        | special charter color             | #4cdaab     |
| --check-icon-color                | color of check icon               | #38e9ae     |
| --copy-icon-path                  | svg path for the copy icon        | --            |
| --check-icon-path                 | svg path for the check icon       | --            |
| --snippet-font                    | fonts                             | Ubuntu        |

</p>
</details>

---

<details><summary><b style="font-size: 20px;">Effects</b></summary>
<p>
Ngx Snippets comes with prebuilt effects for you use:

Example

```javascript
  <omni-snippets
    [snippets]="exampleSnippets"
    backlight="backlight-RGB"
  ></omni-snippets>
```

List of effect:

| Effect Input Name    | Effecting Result                                                       |
| -------------------- | ---------------------------------------------------------------------- | 
| backlight            | Applies Backlight to the snippet                                       |
| neon                 | Applies neon glow to the gutter separator line and lower header border |
</p>
</details>
