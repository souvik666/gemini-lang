(function () {
  function id(x) {
    return x[0];
  }

  const mylexer = require("./lexer.js");
  var grammar = {
    Lexer: mylexer,
    ParserRules: [
      { name: "statement", symbols: ["assigment"], postprocess: id },
      { name: "statement", symbols: ["function_call"], postprocess: id },
      {
        name: "assigment",
        symbols: [
          mylexer.has("identifier") ? { type: "identifier" } : identifier,
          "_",
          { literal: "=" },
          "_",
          "literal",
        ],
        postprocess: (data) => {
          return {
            type: "assigment",
            var_name: data[0],
            value: data[4],
          };
        },
      },
      {
        name: "function_call",
        symbols: [
          mylexer.has("identifier") ? { type: "identifier" } : identifier,
          "_",
          { literal: "(" },
          "_",
          "parameter_list",
          "_",
          { literal: ")" },
        ],
        postprocess: (data) => {
          return {
            type: "function_call",
            fun_name: data[0],
            parameters: data[4],
          };
        },
      },
      {
        name: "parameter_list",
        symbols: ["expression"],
        postprocess: (data) => {
          return data[0];
        },
      },
      {
        name: "parameter_list",
        symbols: ["expression", "_", "parameter_list"],
        postprocess: (data) => {
          return [...data];
        },
      },
      {
        name: "expression",
        symbols: [
          mylexer.has("identifier") ? { type: "identifier" } : identifier,
        ],
        postprocess: id,
      },
      { name: "expression", symbols: ["literal"], postprocess: id },
      {
        name: "literal",
        symbols: [mylexer.has("number") ? { type: "number" } : number],
        postprocess: id,
      },
      {
        name: "literal",
        symbols: [mylexer.has("string") ? { type: "string" } : string],
        postprocess: id,
      },
      {
        name: "_",
        symbols: [
          mylexer.has("whitespace") ? { type: "whitespace" } : whitespace,
        ],
      },
    ],
    ParserStart: "statement",
  };
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
