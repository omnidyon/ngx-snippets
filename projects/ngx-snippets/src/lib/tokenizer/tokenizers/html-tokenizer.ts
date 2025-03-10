import { TokenData } from '../../interfaces/token.interface';
import { BaseTokenizer } from './base-tokenizer';

export class HTMLTokenizer extends BaseTokenizer {
  splitExpression  = /([/<>="\t\n\v\f\r ])/g;

  getClass(tokenData: TokenData): string {
    if (this.isQuoted(tokenData)) {
      this.quoted = !this.quoted;
    }

    if (this.quoted || this.isQuoted(tokenData)) {
      return 'quoted-token';
    } else if (this.isMark(tokenData)) {
      return 'kc-token';
    } else if (this.isElementName(tokenData)) {
      return 'element-token';
    } else if (this.isAttribute(tokenData)) {
      return 'attribute-token';
    } else {
      return 'text-token';
    }
  }

  isElementName(tokenData: TokenData): boolean {
    return (
      (tokenData.priorToken === '<' || tokenData.priorToken === '/') &&
      (tokenData.nextToken === ' ' || tokenData.nextToken === '>')
    );
  }

  isAttribute(tokenData: TokenData): boolean {
    return (
      tokenData.nextToken === '=' ||
      (tokenData.nextToken === '>' &&
        tokenData.priorToken === ' ' &&
        tokenData.priorPriorToken !== '/')
    );
  }

  isMark(tokenData: TokenData): boolean {
    return /([<>=/])/g.test(tokenData.token);
  }
}
