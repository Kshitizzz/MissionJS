// PRINT THE NAME OF THE TOPIC AND THE LINKS OF ITS FIRTS 8 REPOS
let cheerio = require('cheerio');
let request = require('request');

let url = "https://github.com/topics"
request(url, cb); 
function cb(error, response, html){ 
    if(error) console.log(error);
    else extractHtml(html);
}

function extractHtml(html){
    let selectorTool = cheerio.load(html);
    let topicAnchors = selectorTool(".topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-secondary.rounded.color-bg-primary.p-5");
    for(let i = 0; i < topicAnchors.length; i++){
        let topicLinkHtml = selectorTool(topicAnchors[i]).find("a");
        let topicName = selectorTool(topicLinkHtml).text().split("\n")[3].trim();
        let topicLink = "https://github.com" + selectorTool(topicLinkHtml).attr("href");
        //console.log(topicName, " --> ", topicLink);
        goToTopicPage(topicName, topicLink);
    }
}

function goToTopicPage(name, link){
    request(link, cb); 
    function cb(error, response, html){ 
        if(error) console.log(error);
        else{
            let selectorTool = cheerio.load(html);
            let topicReposArr = selectorTool("a[class = 'text-bold']");
            console.log(name);
            for(let i = 0; i < 8; i++){
                let repoLink = selectorTool(topicReposArr[i]).attr('href');
                let fullLink = "https://github.com" + repoLink;
                console.log(fullLink);
            }
            console.log();
            console.log(`-----------------------------------------`);
            console.log();
        }
    }
}
