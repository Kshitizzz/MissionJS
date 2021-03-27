let puppeteer = require("puppeteer");

// browser launch
let browserWillBeLaunchedPromise = puppeteer.launch({
    headless: false
});

browserWillBeLaunchedPromise
.then(function(browserInstance){
    // new tab
    let newPagePromise = browserInstance.newPage();
    newPagePromise
    .then(function(newPage){
        console.log("New Page Opened");
        // go to pepcoding
        let pageWillBeOpenedPromise = newPage.goto("https://www.pepcoding.com");
        pageWillBeOpenedPromise
        .then(function(){
            console.log("page is opened")
        })
    })
})