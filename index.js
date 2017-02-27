var Lexer = require('./out/lexer').ImportsLexer

var code = `import {_Test.Test, 'Test'} from './test' `

var tokens = (new Lexer(code)).tokenize()

console.log(tokens)