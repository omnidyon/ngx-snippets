import { CommentConfig } from '../../interfaces/comment.interface';
import { TokenData } from '../../interfaces/token.interface';
import { JS_SPLIT } from '../utils/regexp';
import { BaseTokenizer } from './base-tokenizer';

/**
 * Shape every curly-brace language (JS/TS, Java, C#, Go, Rust, C/C++) plugs
 * into to drive the tokenizer. The classification logic is identical across
 * these languages — only the keyword/datatype/operator lists differ.
 */
export interface CStyleConfig {
  controlKeywords: string[];
  contextKeywords: string[];
  declarationKeywords: string[];
  dataTypes: string[];
  operators: string[];
  /** Defaults to `//` line + `/* *​/` block. */
  commentConfig?: CommentConfig;
  /** Defaults to the JS split regex. */
  splitExpression?: RegExp;
}

const DEFAULT_C_STYLE_COMMENT: CommentConfig = {
  commentToken: '//',
  blockToken: {
    startToken: '/**',
    endToken: '*/',
  },
};

export abstract class CStyleTokenizer extends BaseTokenizer {
  splitExpression: RegExp;
  protected readonly config: CStyleConfig;
  scopeLevelRound: number = 1;
  scopeLevelSquare: number = 1;
  scopeLevelCurly: number = 1;

  constructor(config: CStyleConfig) {
    super(config.commentConfig ?? DEFAULT_C_STYLE_COMMENT);
    this.config = config;
    this.splitExpression = config.splitExpression ?? JS_SPLIT;
  }

  getClass(tokenData: TokenData): string {
    if (this.isSeparatorToken(tokenData)) {
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
    } else if (this.isKeywordToken(tokenData, this.config.controlKeywords)) {
      return 'control-keyword-token';
    } else if (this.isKeywordToken(tokenData, this.config.contextKeywords)) {
      return 'context-keyword-token';
    } else if (this.isKeywordToken(tokenData, this.config.declarationKeywords)) {
      return 'declaration-keyword-token';
    } else if (this.isDataToken(tokenData)) {
      return 'data-token';
    } else if (this.isFunctionToken(tokenData)) {
      return 'function-token';
    } else if (this.isParameterToken(tokenData)) {
      return 'parameter-token';
    } else if (this.isOperatorToken(tokenData)) {
      return 'operator-token';
    } else if (/[()]/.test(tokenData.token)) {
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
    return tokenSet.includes(tokenData.token) && tokenData.nextToken !== ':';
  }

  isDataToken(tokenData: TokenData): boolean {
    return (
      !!(tokenData.priorPriorToken === ':' && tokenData.token) ||
      this.config.dataTypes.includes(tokenData.token)
    );
  }

  isFunctionToken(tokenData: TokenData): boolean {
    return tokenData.nextToken === '(' && !tokenData.token.includes('/');
  }

  isParameterToken(tokenData: TokenData): boolean {
    return tokenData.nextToken !== ')' && tokenData.nextToken === ':';
  }

  isSeparatorToken(tokenData: TokenData): boolean {
    return /[!,.:;]/.test(tokenData.token);
  }

  isOperatorToken(tokenData: TokenData): boolean {
    return this.config.operators.includes(tokenData.token);
  }
}
