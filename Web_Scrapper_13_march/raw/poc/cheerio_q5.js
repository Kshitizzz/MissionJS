let cheerio = require('cheerio');
let request = require('request');

// Print batsmen and their team names

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"
request(url, cb); 
function cb(error, response, html){ 
    if(error) console.log(error);
    else extractHtml(html);
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let teamNameEleArr = selectorTool(".Collapsible h5");
    let teamNameArr = [];
    
    for(let i = 0; i < teamNameEleArr.length; i++){
        let teamName = selectorTool(teamNameEleArr[i]).text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim()
        teamNameArr.push(teamName);
    }
    let batsmanTableArr =  selectorTool(".table.batsman");
    for(let i = 0; i < batsmanTableArr; i++){
        let batsmanNameAnchor = selectorTool(batsmanTableArr[i]).find("tbody tr .batsman-cell a");
        for(let j = 0; j < batsmanNameAnchor.length; j++){
            let name = selectorTool(batsmanNameAnchor[j]).text();
            let teamName = teamNameArr[i];
            let link = selectorTool(batsmanNameAnchor[j]).attr("href");
            printBirthdays(link, name, teamName);
        }
    }
}

function printBirthdays(link, name, teamName){
    request(link, cb);
    function cb(error, response, html){
        if(error){
            console.log(error);
        }else{
            extractBirthday(html, name, teamName);
        }
    }
}

function extractBirthday(html, name, teamName){
    let selectorTool = cheerio.load(html);
    let birthdayElem = selectorTool(".ciPlayerinformationtxt span");
    let birthday = selectorTool(birthdayElem[1]).text();
    console.log(name + " Plays for " + teamName + " was born on " + birthday);
}
