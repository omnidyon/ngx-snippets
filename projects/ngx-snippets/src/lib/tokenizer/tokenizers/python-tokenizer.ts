import { TokenData } from '../../interfaces/token.interface';
import { PYTHON_SPLIT } from '../utils/regexp';
import { BaseTokenizer } from './base-tokenizer';
import {
  PYTHON_DATA_TYPES,
  PYTHON_CONTROL_KEYWORDS,
  PYTHON_CONTEXT_KEYWORDS,
  PYTHON_DECLARATION_KEYWORDS,
} from './tokens/python-tokens';

const COMMENT_CONFIG = {
  commentToken: '#',
};

const NUMBER_RE = /^-?\d+(\.\d+)?([eE][+-]?\d+)?[jJ]?$/;

/**
 * Python uses indentation for scope (no curly braces), `#` for line comments,
 * and `@` for decorators. Triple-quoted strings rely on the base quote state
 * machine — perfect multi-line docstring highlighting is out of scope for a
 * snippet renderer.
 */
export class PythonTokenizer extends BaseTokenizer {
  splitExpression = PYTHON_SPLIT;
  scopeLevelRound: number = 1;
  scopeLevelSquare: number = 1;
  scopeLevelCurly: number = 1;

  constructor() {
    super(COMMENT_CONFIG);
  }

  getClass(tokenData: TokenData): string {
    if (this.isSeparator(tokenData)) {
      return 'separator-token';
    } else if (tokenData.token === '{') {
      return `scope-level-${this.scopeLevelCurly++}`;
    } else if (tokenData.token === '}') {
      return `scope-level-${--this.scopeLevelCurly}`;
    } else if (tokenData.token === '(') {
      return `scope-level-${this.scopeLevelRound++}`;
    } else if (tokenData.token === ')') {
      return `scope-level-${--this.scopeLevelRound}`;
    } else if (tokenData.token === '[') {
      return `scope-level-${this.scopeLevelSquare++}`;
    } else if (tokenData.token === ']') {
      return `scope-level-${--this.scopeLevelSquare}`;
    } else if (this.isDecorator(tokenData)) {
      return 'context-keyword-token';
    } else if (this.isKeyword(tokenData, PYTHON_CONTROL_KEYWORDS)) {
      return 'control-keyword-token';
    } else if (this.isKeyword(tokenData, PYTHON_CONTEXT_KEYWORDS)) {
      return 'context-keyword-token';
    } else if (this.isKeyword(tokenData, PYTHON_DECLARATION_KEYWORDS)) {
      return 'declaration-keyword-token';
    } else if (this.isDataType(tokenData)) {
      return 'data-token';
    } else if (this.isNumber(tokenData)) {
      return 'data-token';
    } else if (this.isFunction(tokenData)) {
      return 'function-token';
    } else {
      return 'text-token';
    }
  }

  isKeyword(tokenData: TokenData, tokenSet: string[]): boolean {
    return tokenSet.includes(tokenData.token);
  }

  isDataType(tokenData: TokenData): boolean {
    return PYTHON_DATA_TYPES.includes(tokenData.token);
  }

  isFunction(tokenData: TokenData): boolean {
    return tokenData.nextToken === '(' && tokenData.token.length > 0;
  }

  isDecorator(tokenData: TokenData): boolean {
    return tokenData.token === '@' || tokenData.priorToken === '@';
  }

  isNumber(tokenData: TokenData): boolean {
    return NUMBER_RE.test(tokenData.token);
  }

  isSeparator(tokenData: TokenData): boolean {
    return /[,.:;]/.test(tokenData.token);
  }
}
