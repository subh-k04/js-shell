const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { constants } = require("fs");


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
      if(commands.length == 1){
        prompt()
        return
      }
      let nxt = commands[1]
      if(nxt === "echo" || nxt === "type" || nxt === "exit"){
        console.log(`${nxt} is a shell builtin`)
      }else{
        const dirpath = process.env.PATH
        const folders = dirpath.split(path.delimiter) 
        let gotIt = false
        for(let i = 0 ; i < folders.length ; i++){
          let filePath = path.join(folders[i], nxt)

          try{
            fs.accessSync(filePath, constants.X_OK);
            console.log(`${nxt} is ${filePath}`)
            gotIt = true
            break
          } catch (err){}

        }
        if(!gotIt){
          console.log(`${nxt}: not found`)
        }
      }
    }
    else{
      console.log(`${cmd}: command not found`)
    }
    prompt()
  });
}

prompt()
