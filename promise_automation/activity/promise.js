let fs = require("fs");
console.log("Before");

// callback is an old way to do async programming
fs.readFile("f1.txt", (err, data) => {
    if(err) console.log(err);
    else console.log(data+"");
});


// promise returns initial state which is always pending 
let promise = fs.promises.readFile("f2.txt");
console.log("Initial State =>", promise);
console.log("after");

// consumer function - function which consumes promise, as in executes once the promise finishes execution
promise.then(function(data){
    console.log("Data from file after reading gets done using promises =>" + data);
})
// if promise gets rejected due to some error, to catch it
promise.catch(function(err){
    console.log(err);
})

console.log("Hello I am at last!");

