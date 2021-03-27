// PRINT THE NAME OF THE TOPIC AND THE LINKS OF ITS FIRTS 8 REPOS
let cheerio = require('cheerio');
let request = require('request');
let fs = require("fs");
let path = require("path");
let PDFDoc = require("pdfkit");

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
                createFolder(name, fullLink); // Send topic name and its repo name to create folder and files
            }            
        }
    }
}

function createFolder(topicName, linkOfRepoInTopic){
    let fileName = linkOfRepoInTopic.split("/").pop();
    let folderName = topicName;
    let filePath = "./" + topicName + "/" + fileName; // remember to add file extension according to your need

    try {
        if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
        }
    }catch (err) {
        console.log(err)
    }

    getIssues(linkOfRepoInTopic, filePath);
}

function getIssues(linkToRepo, filePath){
    request(linkToRepo+"/issues", cb)
    function cb(err, response, html){
        if(err) {
            if(response.statusCode == 404){
                console.log("No issues page found");
            }else{
                console.log(err);
            }  
        }
        else extractAndWriteIssues(html, filePath);
    }
}

function extractAndWriteIssues(issuePageHtml, filePath){
    let topicName = filePath.split("/")[1];
    let repoName = filePath.split("/")[2];
    let selTool = cheerio.load(issuePageHtml);
    let issues = selTool("a[data-hovercard-type = 'issue']");
    let issueArrToPutInFile = [];
    for(let i = 0; i < issues.length; i++){
        let issueHeading = selTool(issues[i]).text();
        let issueLink = selTool(issues[i]).attr("href");
        let fullLink = "https://github.com" + issueLink; 
        issueArrToPutInFile.push({
            "Name": issueHeading,
            "Link": fullLink
        });
    }
    // write to a pdf file (format should be JSON which we already stored in the upper issuesArrToPutInFile)
    const pdf = new PDFDoc;
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    filePath = filePath + ".pdf";
    pdf.pipe(fs.createWriteStream(filePath));
    pdf.text(JSON.stringify(issueArrToPutInFile));
    pdf.end();
}