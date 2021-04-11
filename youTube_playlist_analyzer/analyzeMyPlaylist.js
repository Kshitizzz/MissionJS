// Optional Functionality - add wait for loader functionality - ONLY SCROLL DOWN WHEN LOADER HAS FINISHED LOADING
// Optional Functionaliuty - add watch time for 1x, 1.5x, 2x speeds

// Number of videos
// watch time or duration
// number of vids
// views
// list of videos --> export in an excel

let puppeteer = require("puppeteer");
let fs = require('fs');
let playlistLink = process.argv.slice(2)[0]; // accept url of the playlist from the command line

(async function(){
    try{
        let browserInstance = await puppeteer.launch({ //puppeteer.launch returns a promise, hence await for it
            headless : false,
            defaultViewport : null,
            args : ["--start-maximized"]
        });

        let newPage = await browserInstance.newPage(); // open new tab
        await newPage.goto(playlistLink); // goto playlist url

        let playlistStats = await returnStats(newPage, playlistLink); // return top level stats of the playlist
        let numberOfVideos = playlistStats[0];
        let numberOfViews = playlistStats[1];
        let lastUpdated = playlistStats[2];
    
        let currentVideoCount = await scrollToBottom(newPage, "#video-title"); // fucntion which scrolls for us, as all videos are not rendered at once
        while(currentVideoCount < numberOfVideos-50){ // keeping a buffer of 50 videos, as actual no of videos is != numberOfVideos, its 899, while numberOfVideos > 900
            currentVideoCount = await scrollToBottom(newPage, "#video-title");  // recursively scroll until number of rendered videos are equal to the number of videos according to the document.querySelectorAll()
        }
        
        let timeDurArr = await newPage.evaluate(getTimeDuration, "span.style-scope.ytd-thumbnail-overlay-time-status-renderer", "#video-title"); // function which returns an object consisting of each video and its duration
        console.table(timeDurArr);

    }catch(err){
        console.log(err);
    }
})(); // IIFE function --> run immediately post defining

async function returnStats(page, url){
    function runOnBrowserConsole(selector){
        let arrOfElements = document.querySelectorAll(selector)
        let stats = [];
        let numberOFVidsString = arrOfElements[0].innerText.split(" ")[0];
        let numberOfViewsString = arrOfElements[1].innerText.split(" ")[0];
        let lastUpdatedString = arrOfElements[2].innerText;
        stats.push(numberOFVidsString, numberOfViewsString, lastUpdatedString);
        return stats;
    }
    return page.evaluate(runOnBrowserConsole, "#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer");
}

async function scrollToBottom(page, title){
    function getLengthConsoleFn(title){
        window.scrollBy(0, window.innerHeight); // scroll
        let titleElementArr = document.querySelectorAll(title);
        if(titleElementArr.length == 899){ // sanity check that fucntion is actually scrolling
            console.log(titleElementArr);
        }
        return titleElementArr.length;
    }
    return page.evaluate(getLengthConsoleFn, title);
}

async function getTimeDuration(durationSelector, title){
    let durationElementArr = document.querySelectorAll(durationSelector); // duration of each video
    let titleElementArr = document.querySelectorAll(title);
    let nameNdDurationArr = [];
    for(let idx = 0; idx < durationElementArr.length; idx++){
        let duration = durationElementArr[idx].innerText;
        let title = titleElementArr[idx].innerText;
        nameNdDurationArr.push({Title : title, Duration : duration});
    }
    return nameNdDurationArr;
}



