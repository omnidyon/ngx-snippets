import { Injectable } from '@angular/core';
import { Formats } from '../../types';
import { Token } from '../../interfaces/token.interface';
import { jsTokenizer } from '../tokenizers/js-tokenizer';
import { htmlTokenizer } from '../tokenizers/html-tokenizer';

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
