import { CStyleTokenizer } from './c-style-tokenizer';
import {
  JAVA_DATA_TYPES,
  JAVA_CONTROL_KEYWORDS,
  JAVA_CONTEXT_KEYWORDS,
  JAVA_DECLARATION_KEYWORDS,
  JAVA_OPERATORS,
} from './tokens/java-tokens';

export class JavaTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      controlKeywords: JAVA_CONTROL_KEYWORDS,
      contextKeywords: JAVA_CONTEXT_KEYWORDS,
      declarationKeywords: JAVA_DECLARATION_KEYWORDS,
      dataTypes: JAVA_DATA_TYPES,
      operators: JAVA_OPERATORS,
    });
  }
}
