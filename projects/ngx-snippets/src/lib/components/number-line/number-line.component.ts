import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { CopyService } from '../../services/copy.service';

@Component({
  selector: 'omni-number-line',
  imports: [NgClass],
  templateUrl: './number-line.component.html',
  styleUrls: ['./number-line.component.scss', '../../styles/defaults.scss'],
})
export class NumberLineComponent {
  self!: HTMLSpanElement;
  selected: boolean = false;
  valueForCopy: string = '';

  @Input() number!: number;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private copyService: CopyService
  ) {
    this.self = this.elementRef.nativeElement;
  }

  selectLine(): void {
    this.traverseLine(this.self);
    this.copyService.setLine(this.number, this.valueForCopy);
    this.copyService.toClipboard();
  }

  traverseLine(element: Element): void {
    const start = element === this.self;
    if (start) {
      this.selected = !this.selected;
      this.valueForCopy = '';
    }

    const coordinates = element.getBoundingClientRect();
    const offset = Math.round(coordinates.width) + (start ? 11 : 1);

    const nextInLine: Element = document.elementsFromPoint(
      coordinates.x + offset,
      coordinates.y + coordinates.height / 2
    )[0];

    if (nextInLine.nodeName !== 'PRE') {
      if (nextInLine.classList.contains('selected-element')) {
        this.renderer.removeClass(nextInLine, 'selected-element');
      } else {
        this.renderer.addClass(nextInLine, 'selected-element');
        this.valueForCopy += nextInLine.innerHTML;
      }

      this.traverseLine(nextInLine);
    }
  }
}
