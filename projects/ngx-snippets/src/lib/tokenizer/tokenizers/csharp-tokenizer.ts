import { CStyleTokenizer } from './c-style-tokenizer';
import {
  CSHARP_DATA_TYPES,
  CSHARP_CONTROL_KEYWORDS,
  CSHARP_CONTEXT_KEYWORDS,
  CSHARP_DECLARATION_KEYWORDS,
  CSHARP_OPERATORS,
} from './tokens/csharp-tokens';

export class CSharpTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      controlKeywords: CSHARP_CONTROL_KEYWORDS,
      contextKeywords: CSHARP_CONTEXT_KEYWORDS,
      declarationKeywords: CSHARP_DECLARATION_KEYWORDS,
      dataTypes: CSHARP_DATA_TYPES,
      operators: CSHARP_OPERATORS,
    });
  }
}
