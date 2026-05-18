import { CStyleTokenizer } from './c-style-tokenizer';
import {
  RUST_DATA_TYPES,
  RUST_KEYWORDS_A,
  RUST_KEYWORDS_B,
  RUST_KEYWORDS_C,
  RUST_OPERATORS,
} from './tokens/rust-tokens';

export class RustTokenizer extends CStyleTokenizer {
  constructor() {
    super({
      keywordsA: RUST_KEYWORDS_A,
      keywordsB: RUST_KEYWORDS_B,
      keywordsC: RUST_KEYWORDS_C,
      dataTypes: RUST_DATA_TYPES,
      operators: RUST_OPERATORS,
    });
  }
}
