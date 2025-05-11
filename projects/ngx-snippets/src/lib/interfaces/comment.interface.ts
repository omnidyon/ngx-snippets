/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

/**
 * @internal
 * @description
 * An interface representing a comment config used by the
 * assigned tokenizer to recognize comments
 */
export interface CommentConfig {
  commentToken?: string;
  blockToken?: BlockComment;
}

/**
 * @internal
 * @description
 * An interface representing a block comment config used by the
 * assigned tokenizer to recognize block comments
 */
export interface BlockComment {
  startToken: string;
  endToken: string;
}
