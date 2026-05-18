import { CStyleTokenizer } from './c-style-tokenizer';
import {
  GO_DATA_TYPES,
  GO_KEYWORDS_A,
  GO_KEYWORDS_B,
  GO_KEYWORDS_C,
  GO_OPERATORS,
} from './tokens/go-tokens';

export class GoTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      keywordsA: GO_KEYWORDS_A,
      keywordsB: GO_KEYWORDS_B,
      keywordsC: GO_KEYWORDS_C,
      dataTypes: GO_DATA_TYPES,
      operators: GO_OPERATORS,
    });
  }
}
