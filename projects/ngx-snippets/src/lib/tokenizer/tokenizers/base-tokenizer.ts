import { Token, TokenData } from '../../interfaces/token.interface';

export abstract class BaseTokenizer {
  abstract splitExpression: RegExp;
  classifiedTokens: Token[] = [];
  quoted: boolean = false;

  parseAndClassify(text: string): Token[] {
    const tokens = text.split(this.splitExpression);

    tokens.forEach((token, index) => {
      this.classifiedTokens.push(
        this.classifyToken({
          token,
          nextToken: tokens[index + 1],
          priorToken: tokens[index - 1],
          priorPriorToken: tokens[index - 2],
        })
      );
    });
    return this.classifiedTokens;
  }

  abstract getClass(tokenData: TokenData): string;

  classifyToken(tokenData: TokenData): Token {
    return {
      token: tokenData.token,
      class: this.getClass(tokenData),
    };
  }

  isQuoted(tokenData: TokenData): boolean {
    return /(["'`])/g.test(tokenData.token);
  }
}
