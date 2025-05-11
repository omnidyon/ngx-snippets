/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Token } from '../../interfaces/token.interface';
import { CopyService } from '../../services/copy.service';
import { NumberLineComponent } from '../../components/number-line/number-line.component';

/**
 * @internal
 * @description
 * A base directive used by both {@link CodeTokenizerDirective} and {@link TemplateTokenizerDirective},
 * responsible, applying  proper styling to the code(mostly coloring), numbering the lines,
 * and handling line focus,
 *
 * For token definition please refer to: https://en.wikipedia.org/wiki/Token#Computing
 */
@Directive()
export abstract class CodeHandlerDirective implements OnDestroy {
  self!: HTMLPreElement;
  runningLine!: HTMLDialogElement;
  lineCount: number = 1;
  lineNumber: number = 1;
  unListeners: (() => void)[] = [];

  @Input() lineNumbers!: HTMLDivElement;

  readonly elementRef = inject(ElementRef);
  readonly renderer = inject(Renderer2);
  readonly copyService = inject(CopyService);
  readonly viewContainer = inject(ViewContainerRef);

  constructor(
  ) {
    this.self = this.elementRef.nativeElement;
    this.createLine();
  }

  handleToken(token: Token): void {
    if (token.token === `\n`) {
      if (this.runningLine.children.length === 0) {
        this.renderer.setProperty(this.runningLine, 'innerHTML', `\n`);
      }

      this.createLine();
      this.addNumberLine();
      this.lineNumber++;
    } else {
      this.createSpan(token);
    }
  }

  createSpan(token: Token): void {
    if (token.token !== `\n` && token.token) {
      const span = this.renderer.createElement('span');
      this.renderer.setProperty(span, 'innerText', token.token);
      this.renderer.addClass(span, token.class);
      this.renderer.appendChild(this.runningLine, span);
    }
  }

  addNumberLine(): void {
    const numberLine = this.viewContainer.createComponent(NumberLineComponent);
    numberLine.setInput('number', this.lineNumber);
    this.renderer.appendChild(
      this.lineNumbers,
      numberLine.location.nativeElement
    );
  }

  clearNumberLines(): void {
    while (this.lineNumbers.firstChild) {
      this.renderer.removeChild(this.lineNumbers, this.lineNumbers.lastChild);
    }
  }

  createLine(): void {
    this.runningLine = this.renderer.createElement('div');
    this.renderer.setAttribute(this.runningLine, 'row-num', this.lineCount.toString());
    this.renderer.addClass(this.runningLine, 'line');
    this.unListeners.push(
      this.renderer.listen(this.runningLine, 'click', (event) =>
        this.focus(event)
      )
    );
    this.renderer.appendChild(this.self, this.runningLine);
    this.lineCount++;
  }

  focus(event: Event): void {
    const line = (event.target as HTMLElement).parentElement;
    if (line && line.hasAttribute('row-num')) {
      if (line.classList.contains('line-focus')) {
        this.renderer.removeClass(line, 'line-focus');
      } else {
        this.clearFocus(line);
        this.renderer.addClass(line, 'line-focus');
      }
    }
  }

  clearFocus(element: Element): void {
    const parent = element.parentElement;
    const divs = parent?.children;
    if (divs) {
      for (let i = 0; i < divs?.length; i++) {
        this.renderer.removeClass(divs[i], 'line-focus');
      }
    }
  }

  ngOnDestroy(): void {
    this.unListeners.forEach((unListener) => unListener());
  }
}
