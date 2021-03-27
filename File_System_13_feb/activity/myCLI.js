// commands -->
// view --tree, --flat
// organize -> same folder, multiple folder
// help
// How to use commands -->
// node mycli.js view <dirName> <mode>
// node mycli.js help

// to take command input, why slice(2) 
// because argv will bring node and mycli.js
// hence take the slice of anything after these two

let input = process.argv.slice(2);
let cmd = input[0]; // command itself
// to import the particular command function stored in help.js
let helpFnObj = require("./commands/help.js");
let organizeFnObj = require("./commands/organize.js");
let viewFnObj = require("./commands/view.js");

// above variables have been enclosed in {}
// {helpFn} is basically shortcut for:
// let helpFile = require("./commands/help.js");
// helpFile.helpFn is equivalent to {helpFn}

switch(cmd){
    case "view":
        viewFnObj.viewFn(input[1], input[2]);
        break;
    
    case "organize":
        organizeFnObj.organizeFn(input[1]);
        break;
    
    case "help":
        helpFnObj.helpFn();
        break;
    
    default:
        console.log("Wrong command, enter help to know more!");
}


