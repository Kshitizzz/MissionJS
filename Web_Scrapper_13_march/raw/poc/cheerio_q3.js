let cheerio = require('cheerio');
let request = require('request');

// for both innings get all bowler names and the wickets taken by them

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
    // tables_bowlers will contain two tables, one for each inning.
    let tables_bowlers = selectorTool(".Collapsible__contentInner .table.bowler");
    for(let i = 0; i < tables_bowlers.length; i++){
        // extract the rows from the tables
        let singleInnBowl = selectorTool(tables_bowlers[i]).find(" tbody tr");
        for(let j = 0; j < singleInnBowl.length; j++){
            // extract the columns from the rows
            let singleAllCol = selectorTool(singleInnBowl[j]).find("td");
            // name is at 0th index
            // wicket is at 4th index
            let name = selectorTool(singleAllCol[0]).text();
            let wickets = selectorTool(singleAllCol[4]).text();
            console.log("Name -->", name, "Wickets-->", wickets);
        }
        // print a line separator between bowlers of both innings
        console.log("-------------------------------------------------");
    }
}

