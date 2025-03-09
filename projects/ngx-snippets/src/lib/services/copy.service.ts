import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  private _textToCopy: string = '';
  private _linesToCope: {[key: string]: string} = {}

  set(text: string): void {
    this._textToCopy = text;
  }

  get(): string {
    return this._textToCopy;
  }

  add(text: string): void{
    this._textToCopy += text;
  }

  setLine(number: number, line: string): void {
    if(!line) {
      delete this._linesToCope[number]
    } else {
      this._linesToCope[number] = line;
    }
    this._textToCopy = Object.values(this._linesToCope).join(`\n`);
  }

  toClipboard(): void {
    navigator.clipboard.writeText(this._textToCopy);
  }
}
