const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ");
rl.prompt();


rl.on("line", async (line) => {
  let arr = line.split(" ")
  if(arr[0] === "echo"){
    console.log(arr.slice(1).join(" "))
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

