/**
 * Limited types supported by parser for import statements
 */

/**
 * Supported types for single tokens
 * @type AllowedTokenTypes
 */
export enum TokenTypes {
  Unknown,
  Asterisk,
  Lbrace,
  Rbrace,
  Identifier,
  Literal,
  Keyword,
  Comma,
}
