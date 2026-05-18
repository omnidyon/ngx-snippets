import { TokenData } from '../../interfaces/token.interface';
import { JS_SPLIT } from '../utils/regexp';
import { BaseTokenizer } from './base-tokenizer';
import { JSON_LITERAL_TOKENS } from './tokens/json-tokens';

const NUMBER_RE = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;

/**
 * JSON has no comments and only three literal keywords (true, false, null).
 * Keys are quoted strings followed by `:`, values are quoted strings,
 * numbers, literals, arrays, or objects.
 */
export class JSONTokenizer extends BaseTokenizer {
  splitExpression = JS_SPLIT;
  scopeLevelCurly: number = 1;
  scopeLevelSquare: number = 1;

  constructor() {
    super({ commentToken: undefined as unknown as string });
  }

  getClass(tokenData: TokenData): string {
    if (tokenData.token === '{') {
      return `scope-level-${this.scopeLevelCurly++}`;
    } else if (tokenData.token === '}') {
      return `scope-level-${--this.scopeLevelCurly}`;
    } else if (tokenData.token === '[') {
      return `scope-level-${this.scopeLevelSquare++}`;
    } else if (tokenData.token === ']') {
      return `scope-level-${--this.scopeLevelSquare}`;
    } else if (this.isLiteral(tokenData)) {
      return 'declaration-keyword-token';
    } else if (this.isNumber(tokenData)) {
      return 'data-token';
    } else if (this.isKey(tokenData)) {
      return 'property-token';
    } else if (this.isSeparator(tokenData)) {
      return 'separator-token';
    } else {
      return 'text-token';
    }
  }

  isLiteral(tokenData: TokenData): boolean {
    return JSON_LITERAL_TOKENS.includes(tokenData.token);
  }

  isNumber(tokenData: TokenData): boolean {
    return NUMBER_RE.test(tokenData.token);
  }

  isKey(tokenData: TokenData): boolean {
    return tokenData.nextToken === ':';
  }

  isSeparator(tokenData: TokenData): boolean {
    return /[,:]/.test(tokenData.token);
  }
}
