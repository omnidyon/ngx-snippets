import { CStyleTokenizer } from './c-style-tokenizer';
import {
  GO_DATA_TYPES,
  GO_CONTROL_KEYWORDS,
  GO_CONTEXT_KEYWORDS,
  GO_DECLARATION_KEYWORDS,
  GO_OPERATORS,
} from './tokens/go-tokens';

export class GoTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      controlKeywords: GO_CONTROL_KEYWORDS,
      contextKeywords: GO_CONTEXT_KEYWORDS,
      declarationKeywords: GO_DECLARATION_KEYWORDS,
      dataTypes: GO_DATA_TYPES,
      operators: GO_OPERATORS,
    });
  }
}
