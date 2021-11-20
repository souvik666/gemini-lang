const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs = require("fs").promises;

async function main() {
  const filname = process.argv[2];
  if (!filname) {
    return console.log("Please provide a filename");
  }
  const code = (await fs.readFile(filname)).toString();
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(code);
  if (parser.results.length > 1) {
    console.log("parse tree genratre multiplae results");
  }
  console.log(parser.results[0]);
}

main().catch((err) => console.log(err.stack));
