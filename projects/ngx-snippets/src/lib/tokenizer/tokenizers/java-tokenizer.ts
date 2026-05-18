import { CStyleTokenizer } from './c-style-tokenizer';
import {
  JAVA_DATA_TYPES,
  JAVA_KEYWORDS_A,
  JAVA_KEYWORDS_B,
  JAVA_KEYWORDS_C,
  JAVA_OPERATORS,
} from './tokens/java-tokens';

export class JavaTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      keywordsA: JAVA_KEYWORDS_A,
      keywordsB: JAVA_KEYWORDS_B,
      keywordsC: JAVA_KEYWORDS_C,
      dataTypes: JAVA_DATA_TYPES,
      operators: JAVA_OPERATORS,
    });
  }
}
