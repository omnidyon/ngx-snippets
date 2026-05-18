/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import { Injectable } from '@angular/core';

/**
 * Per-snippet clipboard state. Intentionally NOT `providedIn: 'root'` —
 * each <omni-snippets> instance gets its own via the component's
 * `providers: [CopyService]`, otherwise multiple snippets on the same page
 * would stomp each other's clipboard buffer.
 */
@Injectable()
export class CopyService {
  private _textToCopy: string = '';
  private _linesToCopy: { [key: string]: string } = {};

  set(text: string): void {
    this._textToCopy = text;
  }

  get(): string {
    return this._textToCopy;
  }

  add(text: string): void {
    this._textToCopy += text;
  }

  setLine(number: number, line: string): void {
    if (!line) {
      delete this._linesToCopy[number];
    } else {
      this._linesToCopy[number] = line;
    }
    this._textToCopy = Object.values(this._linesToCopy).join(`\n`);
  }

  toClipboard(): Promise<void> {
    if (!navigator?.clipboard?.writeText) {
      return Promise.reject(new Error('Clipboard API unavailable'));
    }
    return navigator.clipboard.writeText(this._textToCopy).catch((err) => {
      // Surface the failure so callers can react; silent rejection masked
      // real bugs (e.g. running on insecure context / permissions denied).
      console.error('Failed to copy to clipboard', err);
      throw err;
    });
  }
}
