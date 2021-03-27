let request = require("request");
let cheerio = require("cheerio")
let path = require("path")
let fs = require("fs");

let urlDomain = "https://www.espncricinfo.com";

let landingPage = "https://www.espncricinfo.com//series//ipl-2020-21-1210595"
request(landingPage, callBack);
function callBack(error, response, html){
    if(error){
        console.log(error);
    }else{
        extractResultsPageHtml(html);
    }
}

function extractResultsPageHtml(html){
    let selTool = cheerio.load(html);
    let allResultsPageURL = selTool("a[data-hover = 'View All Results']").attr("href");
    request(urlDomain+allResultsPageURL, callBack);
    function callBack(error, response, html){
        if(error){
            console.log(error);
        }else{
            processResultsPageHtml(html);
        }
    }
}

function processResultsPageHtml(html){
    let selTool = cheerio.load(html);
    let scorecardElements = selTool("a[data-hover = 'Scorecard']")
    let scorecardUrls = [];
    for(let i = 0; i < scorecardElements.length; i++){
        let fullUrl = urlDomain + selTool(scorecardElements[i]).attr("href");
        scorecardUrls.push(fullUrl);
    }
    //console.log(scorecardUrls);
    for(let i = 0; i < scorecardUrls.length; i++){
        extractScorecardHtml(scorecardUrls[i]);
    }
}

function extractScorecardHtml(url){
    request(url, callBack);
    function callBack(error, response, html){
        if(error){
            console.log(error);
        }else{
            processScorecardPage(html);
        }
    }
}

function processScorecardPage(html){
    let selTool = cheerio.load(html);

    let matchDescriptionElements = selTool(".match-info.match-info-MATCH .description");
    let matchDescription = selTool(matchDescriptionElements).text();
    matchDescription = matchDescription.split(",");

    let matchNumber = matchDescription[0].trim();
    let venue = matchDescription[1].trim();
    let date = matchDescription[2].trim();

    let teamNameElements = selTool("div[class = 'match-info match-info-MATCH'] a[class = 'name-link']");
    let batsmanTables = selTool(".table.batsman");

    let matchStatusElement = selTool(".match-info.match-info-MATCH .status-text");
    let matchStatus = selTool(matchStatusElement).text();

    let team_1 = selTool(teamNameElements[0]).text();
    let team_2 = selTool(teamNameElements[1]).text();

    createDirectory(team_1);
    createDirectory(team_2);

    let teamTable_1 = selTool(batsmanTables[0]);
    let teamTable_2 = selTool(batsmanTables[1]);

    let rowsTable_1 = teamTable_1.find("tbody tr");
    let rowsTable_2 = teamTable_2.find("tbody tr");
    
    for(let i = 0; i < rowsTable_1.length-1; i++){
        if(selTool(rowsTable_1[i]).text().length > 0){
            let cols = selTool(rowsTable_1[i]).find("td");
            let playerName = selTool(cols[0]).text();
            stats = [];
            for(let j = 1; j < cols.length; j++){
                if(selTool(cols[j]).text() != "-"){
                    stats.push(selTool(cols[j]).text());
                }
            }
            stats.push(matchNumber, venue, date, matchStatus, team_2);
            let batsmanObject = new Batsman(...stats);
            appendToJSON(team_1, playerName, batsmanObject);
        }
        
    }

    for(let i = 0; i < rowsTable_2.length-1; i++){
        if(selTool(rowsTable_2[i]).text().length > 0){
            let cols = selTool(rowsTable_2[i]).find("td");
            let playerName = selTool(cols[0]).text();
            stats = [];
            for(let j = 1; j < cols.length; j++){
                if(selTool(cols[j]).text() != "-"){
                    stats.push(selTool(cols[j]).text());
                }
            }
            stats.push(matchNumber, venue, date, matchStatus, team_1);
            let batsmanObject = new Batsman(...stats);
            appendToJSON(team_2, playerName, batsmanObject);
        }
        
    }
    
}

function createDirectory(team){
    let fullPath = path.join("C:\\Users\\kshit\\Desktop\\MissionJS\\Web_Scrapper_13_march\\Homework\\", "ipl2020", team);
    try {
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath)
        }
    }catch (err) {
            console.log(err)
        }
}

function Batsman(info, runs, balls, fours, sixes, sr, matchNumber, venue, date, matchStatus, opponent){
    this.info = info,
    this.runs = runs,
    this.balls = balls,
    this.fours = fours,
    this.sixes = sixes,
    this.strike_rate = sr
    this.match_number = matchNumber,
    this.venue = venue,
    this.date = date,
    this.match_status = matchStatus;
    this.opponent = opponent
};

function appendToJSON(team, player, obj){

    let pathToWriteTo = path.join("C:\\Users\\kshit\\Desktop\\MissionJS\\Web_Scrapper_13_march\\Homework\\ipl2020", team, player);
    pathToWriteTo = pathToWriteTo + ".json";
    matchStats = [];

    if (!fs.existsSync(pathToWriteTo)) {
        fs.writeFileSync(pathToWriteTo, JSON.stringify(matchStats));
        return;
    } 
    var data = fs.readFileSync(pathToWriteTo, 'utf8');  
    var list = JSON.parse(data);
    if (list instanceof Array) list.push(obj);
    fs.writeFileSync(pathToWriteTo, JSON.stringify(list, null, 2)); 
}   