let cheerio = require('cheerio');
let request = require('request');

// Print batsmen and their team names

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results"
request(url, cb); 
function cb(error, response, html){ 
    if(error) console.log(error);
    else extractHtml(html);
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let scorecardAnchors = selectorTool("a[data-hover='Scorecard']");
    let allLinks = [];
    for(let i = 0; i < scorecardAnchors.length; i++){
        let scorecardLink = selectorTool(scorecardAnchors[i]).attr("href");
        getPlayerOfMatch("https://www.espncricinfo.com"+scorecardLink);
    } 
}



function getPlayerOfMatch(link){
    request(link, cb);
    function cb(error, response, html){ 
        if(error) console.log(error);
        else extractPlayerOfMatch(html);
    }
}

function extractPlayerOfMatch(html){
    let selectorTool = cheerio.load(html);
    let bestPlayerContent = selectorTool(".best-player-name");
    console.log(selectorTool(bestPlayerContent).text());
}