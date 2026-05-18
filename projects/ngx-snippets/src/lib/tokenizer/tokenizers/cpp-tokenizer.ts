import { CStyleTokenizer } from './c-style-tokenizer';
import {
  CPP_DATA_TYPES,
  CPP_KEYWORDS_A,
  CPP_KEYWORDS_B,
  CPP_KEYWORDS_C,
  CPP_OPERATORS,
} from './tokens/cpp-tokens';

/**
 * Single tokenizer that serves both `'C'` and `'C++'` formats — C++ keyword
 * set is a superset of C so it lights up correctly for either input.
 */
export class CppTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      keywordsA: CPP_KEYWORDS_A,
      keywordsB: CPP_KEYWORDS_B,
      keywordsC: CPP_KEYWORDS_C,
      dataTypes: CPP_DATA_TYPES,
      operators: CPP_OPERATORS,
    });
  }
}
