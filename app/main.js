const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ");
rl.prompt();


rl.on("line", async (line) => {
  console.log(`${line}: command not found`)
  rl.prompt()
})

