import {CharStream} from './stream'
import {Token} from './token'

import {TokenTypes} from './types'

/**
 * Regular experssion for matching literal values
 */
const LITERAL_REGEX = /[a-z]/i

/**
 * Base class for lexeing raw source string
 * Exposes `tokenize` method
 * Produces list of tokens
 *
 * @class ImportsLexer
 */
export class ImportsLexer {
  source: string
  _stream: CharStream
  tokens: Array<Token>

  allowedKeywords: Array<string> = [
    'import',
    'require', // just an alias
    'load',
    'from'
  ]

  /**
   * Create instance
   * @param {string} source
   */
  constructor(source: string) {
    this.source = source
    this._stream = new CharStream(source)
    this.tokens = []
  }

  /**
   * Looking through raw source string and produces list of tokens
   * @returns {Array<Token>} list of found tokens
   */
  tokenize(): Array<Token> {
    while (!this._stream.EOF) {
      let char = this._stream.readNextChar()

      // Match literal value
      if (LITERAL_REGEX.test(char)) {
        let value = char
        while (LITERAL_REGEX.test(this._stream.peekCurrent())) {
          value += this._stream.readNextChar()
        }

        if (this.allowedKeywords.indexOf(value) > -1) {
          this.tokens.push(new Token(TokenTypes.Keyword, value))
        } else {
          this.tokens.push(new Token(TokenTypes.Identifier, value))
        }
      } else if (char == '\'' || char == '"' || char == '`') {
        let value = this._stream.readNextChar()
        while (this._stream.peekCurrent() !== char && !this._stream.EOF) {
          value += this._stream.readNextChar()
        }
        this.tokens.push(new Token(TokenTypes.Literal, value))
        this._stream.readNextChar()
      } else if (char == '(') {
        this.tokens.push(new Token(TokenTypes.Lbrace, char))
      } else if (char == ')') {
        this.tokens.push(new Token(TokenTypes.Rbrace, char))
      } else if (char == '*') {
        this.tokens.push(new Token(TokenTypes.Asterisk, char))
      } else if (char == ',') {
        this.tokens.push(new Token(TokenTypes.Comma, char))
      }else if (char == '\r' || char == '\t' || char == '\n' || char == ' ') {
          continue
      } else {
        console.log('Unknown token', char.charCodeAt(0))
        break
      }
    }

    return this.tokens
  }
}
