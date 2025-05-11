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
 * An interface representing a classified code token
 */
export interface Token {
  token: string;
  class: string;
}

/**
 * @internal
 * @description
 * An interface representing a not classified code token used to preform
 * token classification
 */
export interface TokenData {
  token: string;
  priorToken?: string;
  priorPriorToken?: string;
  nextToken?: string;
  secondNextToken?: string;
}
