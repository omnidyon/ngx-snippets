import { Renderer2 } from '@angular/core';

export const lineSelect = (event: Event, renderer: Renderer2): void => {
  const element = event.target as HTMLSpanElement;

  const getInline = (element: Element) => {
    const start = element.classList[0] === 'line-number';
    if(start) {
      if(element.classList.contains('selected-line-number')) {
        renderer.removeClass(element, 'selected-line-number');
      } else {
        renderer.addClass(element, 'selected-line-number');
      }
    }

    const coordinates = element.getBoundingClientRect();
    const offset = Math.round(coordinates.width) + (start ? 11 : 1);

    const nextInLine: Element = document.elementsFromPoint(
      coordinates.x + offset,
      coordinates.y + coordinates.height / 2
    )[0];
    if (nextInLine.nodeName === 'PRE') {
      return;
    } else {
      if (nextInLine.classList.contains('selected-element')) {
        renderer.removeClass(nextInLine, 'selected-element');
      } else {
        renderer.addClass(nextInLine, 'selected-element');
      }

      getInline(nextInLine);
    }
  };

  getInline(element);
};
