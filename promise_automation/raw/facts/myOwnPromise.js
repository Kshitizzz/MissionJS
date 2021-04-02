// Use fs.readFile() to create your own promise that reads a data from a text file in async way

let fs = require("fs");


function promiseReadFile(filePath){
    `This function read and returns the data of the file defined by the filePath, in buffer format.
    It also prints it to the console.`
    // step - 1: wrap the fs.readFile() method in a new Promise() class
    // step - 2: call resolve() where you think the work would get done
    // step - 3: call reject() where you want to return any error, if it occurs
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
    })
}

let myPromise = promiseReadFile("./f1.txt");
// TheSuccesCallBack which should be attached to the promise object by the .then() method
function SuccessCallBack(data){
    console.log("Data -->", data);
}
// TheFailureCallBack which should be attached to the promise object by the .catch() method
function FailureCallBack(err){
    console.log(err);
}

// Both SuccessCallBack and FailureCallBack functions are ASYNC, as they run whenever Promise is fulfilled. They run because .then and .catch 
// attach them to .resolve and .reject functions in the starting only (.then() and .catch() are SYNC, as they attach or map the SuucessCallBacks and FailureCallBacks
// to resolve and reject in the starting)

// calling .then() on myPromise
myPromise.then(SuccessCallBack(data));
// then() method maps the resolve function (it will map in the starting only before fs.readFile hasn't even run) in the promise executor function to the SuccessCallBack function, 
// which is supposed to be run once fs.readFile SUCCESFILLY reads the file, and then calls the resolve function with data argument
// now because then is a synchronous function, it has already mapped the SuccessCallBack to resolve function
// hence, as soon as the fs.readFile compeltes reading the file successfully , it calls resolve(data) which is already mapped to SuccessCallBack by then at the initial code parsing.

// Similarly for .catch()
myPromise.catch(FailureCallBack(err))