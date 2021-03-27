// communcation with file system with the nodejs module called fs
// google specific use case to identify what module to use

let fs = require("fs"); // importing fs module
let path = require("path");

function isFileChecker(dirPath){ // Checking if the content in dirPath is a file or not
    return fs.lstatSync(dirPath).isFile(); // Google this function of fs
}

function readContent(dirPath){ // Read the dir given by dirPath
    return fs.readdirSync(dirPath);
}



function viewTree(dirPath, indent){
    // dirPath can either be file or a folder(directory)
    // check if dirPath is a file
    if(isFileChecker(dirPath)){
        console.log(indent,path.basename(dirPath) + "*"); // if file then print its name
    } else{
        // directory hai phir ye kyuki file ni hai
        // print dirPath
        console.log(indent, path.basename(dirPath));
        // read children of the current directory
        let childrens = readContent(dirPath);
        // for each child call the viewFlat (recursive call)
        for(let i = 0; i < childrens.length; i++){
            viewTree(path.join(dirPath, childrens[i]), indent+"\t");
        }
    }
}

function viewFlat(dirPath){
    // dirPath can either be file or a folder(directory)
    // check if dirPath is a file
    if(isFileChecker(dirPath)){
        console.log(dirPath + "*"); // if file then print its name
    } else{
        // directory hai phir ye kyuki file ni hai
        // print dirPath
        console.log(dirPath);
        // read children of the current directory
        let childrens = readContent(dirPath);
        // for each child call the viewFlat (recursive call)
        for(let i = 0; i < childrens.length; i++){
            viewFlat(dirPath + "/" + childrens[i]);
        }
    }
}

function viewFnToExport(dirPath, mode){
    if(mode === 'tree'){
        viewTree(dirPath, "");
    }
    else if(mode === 'flat'){
        viewFlat(dirPath);
    }
    else{
        console.log("Wrong mode entered!");
    }
}

module.exports = {
    viewFn : viewFnToExport
};