import {ImportsLexer} from './lexer'
import {Token} from './token'

export class ImportsParser {
  _lexer: ImportsLexer
  tokens: Array<Token> = []

  constructor (source: string, tokens?: Array<Token>) {
    this._lexer = new ImportsLexer(source)
    this.tokens = tokens || []
  }

  _tokenize() {
    this.tokens = this._lexer.tokenize()
  }

  parse() {
    // pass
  }

  static parse() {
    // pass
  }
}
