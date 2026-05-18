import { TokenData } from '../../interfaces/token.interface';
import { CSS_SPLIT } from '../utils/regexp';
import { BaseTokenizer } from './base-tokenizer';
import { CSS_PROP_TOKENS, CSS_TOKENS } from './tokens/css-tokens';
import { HTML_TOKENS } from './tokens/html-tokens';

const COMMENT_CONFIG = {
  blockToken: {
    startToken: '/*',
    endToken: '*/',
  },
};

const HEX_COLOR_RE = /^#[0-9a-fA-F]{3,8}$/;

export class CSSTokenizer extends BaseTokenizer {
  splitExpression = CSS_SPLIT;
  scopeLevelCurly: number = 1;
  scopeLevelRound: number = 1;

  constructor() {
    super(COMMENT_CONFIG);
  }

  getClass(tokenData: TokenData): string {
    if (this.isHexColor(tokenData)) {
      return 'data-token';
    } else if (this.isSelector(tokenData)) {
      return 'selector-token';
    } else if (tokenData.token === '{') {
      return `scope-level-${this.scopeLevelCurly++}`;
    } else if (tokenData.token === '}') {
      return `scope-level-${--this.scopeLevelCurly}`;
    } else if (tokenData.token === '(') {
      return `scope-level-${this.scopeLevelRound++}`;
    } else if (tokenData.token === ')') {
      return `scope-level-${--this.scopeLevelRound}`;
    } else if (this.isElementName(tokenData)) {
      return 'element-token';
    } else if (this.isDefinition(tokenData)) {
      return 'kc-token';
    } else if (this.isFunction(tokenData)) {
      return 'function-token';
    } else if (this.isProp(tokenData)) {
      return 'css-prop-token';
    } else if (this.isSeparatorToken(tokenData)) {
      return 'separator-token';
    } else {
      return 'text-token';
    }
  }

  isHexColor(tokenData: TokenData): boolean {
    return HEX_COLOR_RE.test(tokenData.token);
  }

  isElementName(tokenData: TokenData): boolean {
    return HTML_TOKENS.includes(tokenData.token) && tokenData.token !== 'var';
  }

  isSelector(tokenData: TokenData): boolean {
    return (
      tokenData.nextToken === '{' ||
      tokenData.token.startsWith('.') ||
      tokenData.token.startsWith('#')
    );
  }

  isDefinition(tokenData: TokenData): boolean {
    return tokenData.nextToken === ':';
  }

  isFunction(tokenData: TokenData): boolean {
    return CSS_TOKENS.includes(tokenData.token);
  }

  isProp(tokenData: TokenData): boolean {
    return CSS_PROP_TOKENS.includes(tokenData.token);
  }

  isSeparatorToken(tokenData: TokenData): boolean {
    return /([,.:;])/.test(tokenData.token);
  }
}
