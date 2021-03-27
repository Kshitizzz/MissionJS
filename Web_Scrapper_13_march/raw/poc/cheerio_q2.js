let cheerio = require('cheerio');
let request = require('request');

// print the batsmen and bowlers tables from the given link

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"
console.log('Before');
request(url, cb); // runs async, runs callback once the response has been recieved by the client
// callback function, if err encountered then log it, else log html recieved
function cb(error, response, html){ // this is just how request wants us to write the callback function, this signature has been defined by the makers of request
    if(error) console.log(error);
    else extractHtml(html);
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let tables_batsmen = selectorTool(".Collapsible__contentInner .table.batsman");
    let tables_bowlers = selectorTool(".Collapsible__contentInner .table.bowler");
    console.log(tables_bowlers.length);
    // rule --> if indexing, use cheerioSelector()
    let firstTable = selectorTool(tables_bowlers[0]).text()
    console.log(firstTable);
}

console.log('After');