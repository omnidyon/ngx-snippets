/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import { Injectable } from '@angular/core';
import { HTMLTokenizer } from '../tokenizer/tokenizers/html-tokenizer';
import { JSTokenizer } from '../tokenizer/tokenizers/js-tokenizer';
import { Formats } from '../types';
import { Token } from '../interfaces/token.interface';
import { CSSTokenizer } from '../tokenizer/tokenizers/css-tokenizer';
import { JSONTokenizer } from '../tokenizer/tokenizers/json-tokenizer';
import { PythonTokenizer } from '../tokenizer/tokenizers/python-tokenizer';
import { SQLTokenizer } from '../tokenizer/tokenizers/sql-tokenizer';
import { JavaTokenizer } from '../tokenizer/tokenizers/java-tokenizer';
import { CSharpTokenizer } from '../tokenizer/tokenizers/csharp-tokenizer';
import { GoTokenizer } from '../tokenizer/tokenizers/go-tokenizer';
import { RustTokenizer } from '../tokenizer/tokenizers/rust-tokenizer';
import { CppTokenizer } from '../tokenizer/tokenizers/cpp-tokenizer';


@Injectable({
  providedIn: 'root',
})
export class TokenizerService {
  formatterMap = new Map<Formats, any>([
    ['TypeScript', JSTokenizer],
    ['JavaScript', JSTokenizer],
    ['HTML', HTMLTokenizer],
    ['CSS', CSSTokenizer],
    ['JSON', JSONTokenizer],
    ['Python', PythonTokenizer],
    ['SQL', SQLTokenizer],
    ['Java', JavaTokenizer],
    ['C#', CSharpTokenizer],
    ['Go', GoTokenizer],
    ['Rust', RustTokenizer],
    ['C', CppTokenizer],
    ['C++', CppTokenizer],
  ]);

  tokenize(text: string, format: Formats): Token[] {
    const tokenizer = this.formatterMap.get(format) ?? JSTokenizer;
    return new tokenizer().parseAndClassify(text.trim());
  }
}
