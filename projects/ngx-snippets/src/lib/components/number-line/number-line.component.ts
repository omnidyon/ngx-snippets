/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { CopyService } from '../../services/copy.service';

/**
 * @internal
 * @description
 * A component used for showing the line numbers in the gutter as well as handling
 * single line copy functionality
 */
@Component({
  selector: 'omni-number-line',
  imports: [NgClass],
  templateUrl: './number-line.component.html',
  styleUrls: [
    './number-line.component.scss',
    '../../styles/defaults.scss',
    '../snippets/omni-snippets.component.scss',
  ],
})
export class NumberLineComponent {
  self!: HTMLSpanElement;
  selected: boolean = false;
  valueForCopy: string = '';

  @Input() number!: number;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly copyService: CopyService
  ) {
    this.self = this.elementRef.nativeElement;
  }

  selectLine(): void {
    this.handleSelect(this.self);
    this.copyService.setLine(this.number, this.valueForCopy);
    this.copyService.toClipboard();
  }

  handleSelect(element: Element): void {
    this.valueForCopy = '';

    const coordinates = element.getBoundingClientRect();
    const offset = Math.round(coordinates.width) + 11;
    const nextInLine: Element = document.elementsFromPoint(
      coordinates.x + offset,
      coordinates.y + coordinates.height / 2
    )[0];

    try {
      if (nextInLine.hasAttribute('row-num')) {
        this.setLine(nextInLine);
      } else if (nextInLine.parentElement) {
        this.setLine(nextInLine.parentElement);
      }
    } catch {
      throw new Error('Failed to locate the code line');
    }
  }

  setLine(element: Element): void {
    if (element.classList.contains('selected-line')) {
      this.renderer.removeClass(element, 'selected-line');
      this.selected = false;
    } else {
      this.renderer.addClass(element, 'selected-line');
      this.setCopyValue(element);
      this.selected = true;
    }
  }

  setCopyValue(element: Element): void {
    const spans = element.children;

    for (let i = 0; i < spans.length; i++) {
      this.valueForCopy += spans[i].innerHTML;
    }
  }
}
