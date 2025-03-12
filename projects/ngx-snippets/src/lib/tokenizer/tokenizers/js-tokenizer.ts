import { TokenData } from '../../interfaces/token.interface';
import { BaseTokenizer } from './base-tokenizer';
import {
  DATA_TYPE_TOKENS,
  KEYWORD_TOKENS_A,
  KEYWORD_TOKENS_B,
  KEYWORD_TOKENS_C,
  OPERATOR_TOKENS,
} from './tokens/js-ts-tokens';

export class JSTokenizer extends BaseTokenizer {
  splitExpression = /(["'`\t\n\v\f\r !,.:;{}()\[\]])/g;
  scopeLevelRound: number = 1;
  scopeLevelSquare: number = 1;
  scopeLevelCurly: number = 1;

  getClass(tokenData: TokenData): string {
    if (this.isQuoted(tokenData)) {
      this.quoted = !this.quoted;
    }

    if (this.quoted || this.isQuoted(tokenData)) {
      return 'quoted-token';
    } else if (this.isSeparatorToken(tokenData)) {
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
    } else if (this.isObjectProperty(tokenData)) {
      return 'property-token';
    } else if (this.isKeywordToken(tokenData, KEYWORD_TOKENS_A)) {
      return 'ka-token';
    } else if (this.isKeywordToken(tokenData, KEYWORD_TOKENS_B)) {
      return 'kb-token';
    } else if (this.isKeywordToken(tokenData, KEYWORD_TOKENS_C)) {
      return 'kc-token';
    } else if (this.isDataToken(tokenData)) {
      return 'data-token';
    } else if (this.isFunctionToken(tokenData)) {
      return 'function-token';
    } else if (this.isParameterToken(tokenData)) {
      return 'parameter-token';
    } else if (this.isOperatorToken(tokenData)) {
      return 'operator-token';
    } else if (/([()])/g.test(tokenData.token)) {
      return 'var-token';
    } else {
      return 'text-token';
    }
  }

  isObjectProperty(tokenData: TokenData): boolean {
    return (
      tokenData.priorToken === '.' &&
      (tokenData.nextToken === '.' ||
        tokenData.nextToken === ')' ||
        tokenData.nextToken === ',' ||
        !tokenData.nextToken)
    );
  }

  isKeywordToken(tokenData: TokenData, tokenSet: string[]): boolean {
    return (
      tokenSet.some((token) => token === tokenData.token) &&
      tokenData.nextToken !== ':'
    );
  }

  isDataToken(tokenData: TokenData): boolean {
    return (
      !!(tokenData.priorPriorToken === ':' && tokenData.token) ||
      DATA_TYPE_TOKENS.some((token) => token === tokenData.token)
    );
  }

  isFunctionToken(tokenData: TokenData): boolean {
    return tokenData.nextToken === '(' && !tokenData.token.includes('/');
  }

  isParameterToken(tokenData: TokenData): boolean {
    return tokenData.nextToken !== ')' && tokenData.nextToken === ':';
  }

  isSeparatorToken(tokenData: TokenData): boolean {
    return /([!,.:;])/g.test(tokenData.token);
  }

  isOperatorToken(tokenData: TokenData): boolean {
    return OPERATOR_TOKENS.some((token) => token === tokenData.token);
  }
}
