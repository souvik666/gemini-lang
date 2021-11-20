const moo = require("moo");

const lexer = moo.compile({
  whitespace: /[ \t]+/,
  number: { match: /0|[1-9][0-9]*/, value: Number },
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  lparen: "(",
  rparen: ")",
  assigment_op: "=",
  identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
  newline: { match: /\n/, lineBreaks: true },
});

module.exports = lexer;
