const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { constants } = require("fs");
const { spawn } = require("child_process")


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const findExecPath = (filename, directories) => {
  for(let i = 0 ; i < directories.length ; i++){
    let filePath = path.join(directories[i], filename)

    try{
      fs.accessSync(filePath, constants.X_OK)
      return filePath
    }catch (err){}
  }
  return null
}


const prompt = () => {
  const direxPath = process.env.PATH  
  const directories = direxPath.split(path.delimiter)
  rl.question("$ ", (answer) => {
    const commands = answer.split(" ")
    const cmd = commands[0] 
    if(cmd === "exit"){
      process.exit(0)
    }
    else if(cmd === "pwd"){
      console.log(process.cwd())
      prompt()
    }
    else if(cmd === "echo"){
      const args = commands.slice(1).join(" ")
      console.log(args)
      prompt()
    }
    else if(cmd === "type"){
      if(commands.length == 1){
        prompt()
        return
      }
      let nxt = commands[1]
      if(nxt === "echo" || nxt === "type" || nxt === "exit"|| nxt === "pwd"){
        console.log(`${nxt} is a shell builtin`)
      }else{
        const out = findExecPath(nxt, directories)
        if(out == null) console.log(`${nxt}: not found`)
        else{
          console.log(`${nxt} is ${out}`)
        }
      }
      prompt()
    }
    else{
      const out = findExecPath(cmd, directories)
      if(out != null){
        const child = spawn(out, commands.slice(1), {argv0: cmd})
        child.stdout.on("data", (data) => {
          process.stdout.write(data);
        });
        child.stderr.on("data", (data) => {
          process.stderr.write(data);
        });
        child.on("close", (code)=>{
          prompt()
        });
      }
      else {
        console.log(`${cmd}: command not found`)
        prompt()
      }
    }
  });
}

prompt()
