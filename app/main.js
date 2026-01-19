const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ");
rl.prompt();


rl.on("line", async (line) => {
  let part = line.slice(0, 4)
  let size = line.length
  if(part === "echo"){
    console.log(line.slice(5, size))
    rl.prompt()
  }
  else if(!(line === "exit")){
    console.log(`${line}: command not found`)
    rl.prompt()
  }
  else{
    rl.close()
  }
})

