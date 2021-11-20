var fs = require("fs");
const fsPromises = require("fs").promises;
const mylexer = require("./lexer");

async function main() {
  fs.promises
    .readFile("example.gemini")
    .then(function (result) {
      mylexer.reset(result.toString());
      let token;
      while (true) {
        token = mylexer.next();
        if (token) {
          console.log("gemini token:", token.type, token.value);
        } else {
          break;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

main().catch((err) => console.log(err.stack));
