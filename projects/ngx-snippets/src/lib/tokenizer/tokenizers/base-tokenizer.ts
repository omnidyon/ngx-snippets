import { CommentConfig } from '../../interfaces/comment.interface';
import { Token, TokenData } from '../../interfaces/token.interface';

export abstract class BaseTokenizer {
  commentConfig!: CommentConfig;
  abstract splitExpression: RegExp;
  classifiedTokens: Token[] = [];
  quoted: boolean = false;
  commented: boolean = false;
  comment: boolean = false;

  constructor(commentConfig?: CommentConfig) {
    this.commentConfig = commentConfig || {
      commentToken: '//',
    };
  }

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
      class:
        this.isQuoted(tokenData) ||
        this.isComment(tokenData) ||
        this.isCommented(tokenData) ||
        this.getClass(tokenData),
    };
  }

  isQuoted(tokenData: TokenData): string | undefined {
    let quotedClass!: string;
    if (this.quoted) {
      quotedClass = 'quoted-token';
    }

    if (/(["'`])/g.test(tokenData.token)) {
      this.quoted = !this.quoted;
      quotedClass = 'quoted-token';
    }
    return quotedClass;
  }

  isCommented(tokenData: TokenData): string | undefined {
    let commentClass!: string;
    if (this.commented) {
      commentClass = 'comment-token';
    }

    if (
      tokenData.token === this.commentConfig.blockToken?.startToken ||
      tokenData.token === this.commentConfig.blockToken?.endToken
    ) {
      this.commented = !this.commented;
      commentClass = 'comment-token';
    }

    return commentClass;
  }

  isComment(tokenData: TokenData): string | undefined {
    let commentClass!: string;
    if (tokenData.token === this.commentConfig.commentToken) {
      this.comment = true;
      commentClass = 'comment-token';
    }

    if (this.comment) {
      if (tokenData.nextToken === `\n`) {
        this.comment = false;
      }
      commentClass = 'comment-token';
    }

    return commentClass;
  }
}
