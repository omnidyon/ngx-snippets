import { Injectable } from '@angular/core';
import { HTMLTokenizer } from '../tokenizer/tokenizers/html-tokenizer';
import { JSTokenizer } from '../tokenizer/tokenizers/js-tokenizer';
import { Formats } from '../types';
import { Token } from '../interfaces/token.interface';
import { CSSTokenizer } from '../tokenizer/tokenizers/css-tokenizer';


@Injectable({
  providedIn: 'root',
})
export class TokenizerService {
  formatterMap = new Map<Formats, any>([
    ['TypeScript', JSTokenizer],
    ['JavaScript', JSTokenizer],
    ['HTML', HTMLTokenizer],
    ['CSS', CSSTokenizer]
  ]);

  tokenize(text: string, format: Formats): Token[] {
    text = text.replaceAll('&lt;', '<');
    text = text.replaceAll('&gt;', '>');
    text = text.trim();
    const tokenizer = this.formatterMap.get(format) ?? JSTokenizer;
    return new tokenizer().parseAndClassify(text);
  }
}
