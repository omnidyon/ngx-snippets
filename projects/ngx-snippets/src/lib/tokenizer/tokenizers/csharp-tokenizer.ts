import { CStyleTokenizer } from './c-style-tokenizer';
import {
  CSHARP_DATA_TYPES,
  CSHARP_KEYWORDS_A,
  CSHARP_KEYWORDS_B,
  CSHARP_KEYWORDS_C,
  CSHARP_OPERATORS,
} from './tokens/csharp-tokens';

export class CSharpTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      keywordsA: CSHARP_KEYWORDS_A,
      keywordsB: CSHARP_KEYWORDS_B,
      keywordsC: CSHARP_KEYWORDS_C,
      dataTypes: CSHARP_DATA_TYPES,
      operators: CSHARP_OPERATORS,
    });
  }
}
