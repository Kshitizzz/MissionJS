let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
function isFileOrNot(dirPath){
    return fs.lstatSync(dirPath).isFile();
}
function readContent(dirPath){ // Read the dir given by dirPath
    return fs.readdirSync(dirPath);
}
function dirCreator(dirPath){
    if (fs.existsSync(dirPath) == false){
        fs.mkdirSync(dirPath);
    }
}
function getDirectoryName(dirPath){
    let strArr = dirPath.split('.');
    let ext = strArr.pop();
    for(let key in types){
        for(let i = 0; i < types[key].length; i++){
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    return 'others';
}
function OrganizeDir(dirPath)
{
    let isFile = isFileOrNot(dirPath);
    if(isFile){
        let folderName = getDirectoryName(dirPath);
        console.log(dirPath, "->", folderName);
        fs.copyFileSync(dirPath, path.join(orgFilePath, folderName, path.basename(dirPath)));
    }
    else{
        let content = readContent(dirPath);
        for(let i = 0; i < content.length; i++){
            let childPath = path.join(dirPath, content[i]);
            organizeDir(childPath);
        }
    }
}


function OrganizeFnToExport(dirPath){
    let orgFilePath = path.join(dirPath, "Organized");
    dirCreator(orgFilePath);
    for(let key in types){
        let innerDirPath = path.join(orgFilePath, key);
        dirCreator(innerDirPath);
    }
    // others
    let othersDirPath = path.join(orgFilePath , 'others');
    dirCreator(othersDirPath);

    OrganizeDir(dirPath);
}

module.exports = {
    organizeFn : OrganizeFnToExport
};



