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
        allLinks.push(scorecardLink);
    }
    getPlayerOfMatchSync(allLinks, 0);   
}

function getPlayerOfMatchSync(links, n){
    if(links.length == n){
        return;
    }
    request("https://www.espncricinfo.com"+links[n], function(err, resp, html){
        if(err){
            console.log(err);
        }else{
            extractPlayerOfMatch(html);
            getPlayerOfMatchSync(links, n+1);
        }
    })
    
}

function extractPlayerOfMatch(html){
    let selectorTool = cheerio.load(html);
    let bestPlayerContent = selectorTool(".best-player-name");
    console.log(selectorTool(bestPlayerContent).text());
}