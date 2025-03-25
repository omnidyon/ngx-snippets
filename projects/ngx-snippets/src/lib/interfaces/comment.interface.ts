export interface CommentConfig {
  commentToken?: string;
  blockToken?: BlockComment;
}

export interface BlockComment {
  startToken: string;
  endToken: string;
}
