const request = require("request");
// extract the html document from the given URL
console.log('Before');
request("https://www.google.com", cb); // runs async, runs callback once the response has been recieved by the client
// callback function, if err encountered then log it, else log html recieved
function cb(error, response, html){ // this is just how request wants us to write the callback function, this signature has been defined by the makers of request
    if(error) console.log(error);
    else console.log(html);
}

console.log('After');