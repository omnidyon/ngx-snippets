import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CopyService {
  private _textToCopy: BehaviorSubject<string> = new BehaviorSubject<string>('');

  set(text: string): void {
    console.log(text)
    this._textToCopy.next(text);
  }

  get(): string {
    return this._textToCopy.getValue();
  }

  add(text: string): void{
    this._textToCopy.next(this._textToCopy.getValue() + text);
  }

  toClipboard(): void {
    console.log(this._textToCopy.getValue())
    navigator.clipboard.writeText(this._textToCopy.getValue());
  }
}
