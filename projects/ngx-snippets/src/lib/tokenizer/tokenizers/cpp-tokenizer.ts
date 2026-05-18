import { CStyleTokenizer } from './c-style-tokenizer';
import {
  CPP_DATA_TYPES,
  CPP_CONTROL_KEYWORDS,
  CPP_CONTEXT_KEYWORDS,
  CPP_DECLARATION_KEYWORDS,
  CPP_OPERATORS,
} from './tokens/cpp-tokens';

/**
 * Single tokenizer that serves both `'C'` and `'C++'` formats — C++ keyword
 * set is a superset of C so it lights up correctly for either input.
 */
export class CppTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      controlKeywords: CPP_CONTROL_KEYWORDS,
      contextKeywords: CPP_CONTEXT_KEYWORDS,
      declarationKeywords: CPP_DECLARATION_KEYWORDS,
      dataTypes: CPP_DATA_TYPES,
      operators: CPP_OPERATORS,
    });
  }
}
