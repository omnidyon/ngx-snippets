import { Injectable } from '@angular/core';
import { htmlTokenizer } from '../tokenizer/tokenizers/html-tokenizer';
import { jsTokenizer } from '../tokenizer/tokenizers/js-tokenizer';
import { Formats } from '../types';
import { Token } from '../interfaces/token.interface';


@Injectable({
  providedIn: 'root',
})
export class TokenizerService {
  formatterMap = new Map<Formats, (arg0: string) => Token[]>([
    ['TypeScript', jsTokenizer],
    ['JavaScript', jsTokenizer],
    ['HTML', htmlTokenizer],
  ]);

  tokenize(text: string, format: Formats): Token[] {
    text = text.replaceAll('&lt;', '<');
    text = text.replaceAll('&gt;', '>');
    text = text.trim();
    const classifier = this.formatterMap.get(format) ?? jsTokenizer;
    return classifier(text);
  }
}
