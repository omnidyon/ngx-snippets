/**
 * @license
 * Copyright Slavko Mihajlovic All Rights Reserved.
 *
 * Use of this source code is governed by an ISC-style license that can be
 * found at https://www.isc.org/licenses/
 */

import { Formats } from '../types';

/**
 * @internal
 * @description
 * An interface representing a snippet configuration used to assign the proper
 * tokenizer to a snippet
 */
export interface SnippetConfig {
  template: string;
  format: Formats;
}
