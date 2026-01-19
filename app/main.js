const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = () => {
  rl.question("$ ", (answer) => {
    const commands = answer.split(" ")
    const cmd = commands[0] 
    if(cmd === "exit"){
      process.exit(0)
    }
    else if(cmd === "echo"){
      const args = commands.slice(1).join(" ")
      console.log(args)
    }
    else if(cmd === "type"){
      let nxt = commands[1]
      if(nxt === "echo" || nxt === "type" || nxt === "exit"){
        console.log(`${nxt} is a shell builtin`)
      }else{
        console.log(`${nxt}: not found`)
      }
    }
    else{
      console.log(`${cmd}: command not found`)
    }
    prompt()
  });
}

prompt()
