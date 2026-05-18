import { CommentConfig } from '../../interfaces/comment.interface';
import { Token, TokenData } from '../../interfaces/token.interface';

const QUOTE_CHARS = ['"', "'", '`'] as const;
type QuoteChar = (typeof QUOTE_CHARS)[number];

export abstract class BaseTokenizer {
  commentConfig!: CommentConfig;
  abstract splitExpression: RegExp;
  /** Char that opened the current string, or null if not inside a string. */
  openQuote: QuoteChar | null = null;
  commented: boolean = false;
  comment: boolean = false;

  constructor(commentConfig?: CommentConfig) {
    this.commentConfig = commentConfig || {
      commentToken: '//',
    };
  }

  get quoted(): boolean {
    return this.openQuote !== null;
  }

  parseAndClassify(text: string): Token[] {
    const tokens = text.split(this.splitExpression);
    const classifiedTokens: Token[] = [];

    tokens.forEach((token, index) => {
      classifiedTokens.push(
        this.classifyToken({
          token,
          nextToken: tokens[index + 1],
          priorToken: tokens[index - 1],
          priorPriorToken: tokens[index - 2],
        })
      );
    });
    return classifiedTokens;
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

  /**
   * Tracks string-literal state. Only the same quote char that opened the
   * string can close it — so `"don't"` stays a single string instead of
   * flipping state on the apostrophe.
   */
  isQuoted(tokenData: TokenData): string | undefined {
    const wasQuoted = this.openQuote !== null;
    const ch = tokenData.token as QuoteChar;

    if (this.openQuote === null && QUOTE_CHARS.includes(ch)) {
      this.openQuote = ch;
      return 'quoted-token';
    }

    if (this.openQuote !== null && this.openQuote === ch) {
      this.openQuote = null;
      return 'quoted-token';
    }

    return wasQuoted ? 'quoted-token' : undefined;
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
