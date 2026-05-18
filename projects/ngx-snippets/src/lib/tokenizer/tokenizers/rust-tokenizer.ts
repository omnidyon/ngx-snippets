import { CStyleTokenizer } from './c-style-tokenizer';
import {
  RUST_DATA_TYPES,
  RUST_CONTROL_KEYWORDS,
  RUST_CONTEXT_KEYWORDS,
  RUST_DECLARATION_KEYWORDS,
  RUST_OPERATORS,
} from './tokens/rust-tokens';

export class RustTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      controlKeywords: RUST_CONTROL_KEYWORDS,
      contextKeywords: RUST_CONTEXT_KEYWORDS,
      declarationKeywords: RUST_DECLARATION_KEYWORDS,
      dataTypes: RUST_DATA_TYPES,
      operators: RUST_OPERATORS,
    });
  }
}
