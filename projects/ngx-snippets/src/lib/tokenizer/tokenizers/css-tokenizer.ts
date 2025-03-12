import { TokenData } from '../../interfaces/token.interface';
import { BaseTokenizer } from './base-tokenizer';
import { CSS_PROP_TOKENS, CSS_TOKENS } from './tokens/css-tokens';
import { HTML_TOKENS } from './tokens/html-tokens';

export class CSSTokenizer extends BaseTokenizer {
  splitExpression = /(["'\t\n\v\f\r ,:;{}()])/g;
  scopeLevelCurly: number = 1;
  scopeLevelRound: number = 1;

  getClass(tokenData: TokenData): string {
    if (this.isQuoted(tokenData)) {
      this.quoted = !this.quoted;
    }

    if (this.quoted || this.isQuoted(tokenData)) {
      return 'quoted-token';
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
    } else {
      return 'text-token';
    }
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
}
