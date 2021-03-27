let cheerio = require('cheerio');
let request = require('request');

// print the last bowl commentary from the given link

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary"
console.log('Before');
request(url, cb); // runs async, runs callback once the response has been recieved by the client
// callback function, if err encountered then log it, else log html recieved
function cb(error, response, html){ // this is just how request wants us to write the callback function, this signature has been defined by the makers of request
    if(error) console.log(error);
    else extractHtml(html);
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let allCommentaries = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    console.log(allCommentaries.length);
    // rule --> if indexing, use cheerioSelector()
    let lastBcomment = selectorTool(allCommentaries[1]).text()
    console.log(lastBcomment);
}

console.log('After');