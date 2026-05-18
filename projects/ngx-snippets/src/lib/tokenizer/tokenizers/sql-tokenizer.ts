import { TokenData } from '../../interfaces/token.interface';
import { JS_SPLIT } from '../utils/regexp';
import { BaseTokenizer } from './base-tokenizer';
import {
  SQL_DATA_TYPES,
  SQL_KEYWORDS_A,
  SQL_KEYWORDS_B,
  SQL_KEYWORDS_C,
  SQL_OPERATORS,
} from './tokens/sql-tokens';

const COMMENT_CONFIG = {
  commentToken: '--',
  blockToken: {
    startToken: '/*',
    endToken: '*/',
  },
};

const NUMBER_RE = /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/;

/**
 * SQL is case-insensitive — keyword/datatype matching lowercases the token
 * before comparing against the (lowercase) reference lists.
 */
export class SQLTokenizer extends BaseTokenizer {
  splitExpression = JS_SPLIT;
  scopeLevelRound: number = 1;

  constructor() {
    super(COMMENT_CONFIG);
  }

  getClass(tokenData: TokenData): string {
    if (this.isSeparator(tokenData)) {
      return 'separator-token';
    } else if (tokenData.token === '(') {
      return `scope-level-${this.scopeLevelRound++}`;
    } else if (tokenData.token === ')') {
      return `scope-level-${--this.scopeLevelRound}`;
    } else if (this.isNumber(tokenData)) {
      return 'data-token';
    } else if (this.isKeyword(tokenData, SQL_KEYWORDS_A)) {
      return 'ka-token';
    } else if (this.isKeyword(tokenData, SQL_KEYWORDS_B)) {
      return 'kb-token';
    } else if (this.isKeyword(tokenData, SQL_KEYWORDS_C)) {
      return 'kc-token';
    } else if (this.isDataType(tokenData)) {
      return 'data-token';
    } else if (this.isFunction(tokenData)) {
      return 'function-token';
    } else if (this.isOperator(tokenData)) {
      return 'operator-token';
    } else {
      return 'text-token';
    }
  }

  isKeyword(tokenData: TokenData, tokenSet: string[]): boolean {
    return tokenSet.includes(tokenData.token.toLowerCase());
  }

  isDataType(tokenData: TokenData): boolean {
    return SQL_DATA_TYPES.includes(tokenData.token.toLowerCase());
  }

  isFunction(tokenData: TokenData): boolean {
    return tokenData.nextToken === '(' && tokenData.token.length > 0;
  }

  isOperator(tokenData: TokenData): boolean {
    return SQL_OPERATORS.includes(tokenData.token);
  }

  isNumber(tokenData: TokenData): boolean {
    return NUMBER_RE.test(tokenData.token);
  }

  isSeparator(tokenData: TokenData): boolean {
    return /[,.;]/.test(tokenData.token);
  }
}
