//const { stringify } = require("node:querystring");

let stringfied = JSON.stringify([])
let parsed = JSON.parse(stringfied);
parsed.push(JSON.stringify({}));
console.log(parsed);