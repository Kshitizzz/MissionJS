let cheerio = require('cheerio');
let request = require('request');

// Print batsmen and their team names

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
    let teamNames = selectorTool("h5.header-title.label");
    let tables_batsmen = selectorTool(".Collapsible__contentInner .table.batsman");
    for(let i = 0; i < tables_batsmen.length; i++){
        // extract the rows from the tables
        let singleInnBat = selectorTool(tables_batsmen[i]).find(" tbody tr");
        for(let j = 0; j < singleInnBat.length; j++){
            // extract the columns from the rows
            let singleAllCol = selectorTool(singleInnBat[j]).find("td");
            // name is at 0th index
            let name = selectorTool(singleAllCol[0]).text();
            if(name.length > 0 && name != "Extras") console.log(name.trim(), " of ", selectorTool(teamNames[i]).text().substring(0, 14));
        }
        // print a line separator between bowlers of both innings
        console.log("-------------------------------------------------");
    }
}

