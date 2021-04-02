let puppeteer = require("puppeteer");
let {password, email} = require("./secrets");
var globalTab;

console.log("Before");

let browserPromise = puppeteer.launch({
    headless : false,
    defaultViewport : null,
    args : ["--incognito", "--start-maximized"]
})
browserPromise
.then(function(browserInstance){
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
})
.then(function(newTab){
    let loginPageWillBeOpenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    globalTab = newTab;
    return loginPageWillBeOpenedPromise;
})
.then(function(){
    let emailWillBeTypedPromise = globalTab.type("#input-1", email, { delay : 200});
    return emailWillBeTypedPromise;
})
.then(function(){
    let passwordWillBeTypedPromise = globalTab.type("#input-2", password, { delay : 200});
    return passwordWillBeTypedPromise;
})
.then(function(){
    let loginButtonWillBeClickedPromise = globalTab.click("button[data-analytics = 'LoginPassword']");
    let combinedPromise = Promise.all([loginButtonWillBeClickedPromise,
    globalTab.waitForNavigation({waitUntil : "networkidle0"})]);
    return combinedPromise;
})
.then(function(){
    let clickpromise = globalTab.click(".card-content h3[title = 'Interview Preparation Kit']");
    let warmmupChallengeElementPromise = globalTab.waitForSelector("a[data-attr1 = 'warmup']",
    {visible : true});
    let combinedPromise = Promise.all([clickpromise, globalTab.waitForNavigation(
        {waitUntil: "networkidle0"}), warmmupChallengeElementPromise]);

})
.then(function(){
    let clickpromise = globalTab.click("a[data-attr1 = 'warmup']");
    let sockMerchantPromise = globalTab.waitForSelector("a[data-attr1 = 'sock-merchant']", 
    {visible : true});
    let combinedPromise = Promise.all([clickpromise, globalTab.waitForNavigation(
        {waitUntil : "networkidle0"}), sockMerchantPromise]);
        return combinedPromise;
})
.then(function(){
    let clickpromise =- globalTab.click("a[data-attr1 = 'sock-merchant']");
    let combinedPromise = Promise.all([clickpromise, globalTab.waitForNavigation(
        {waitUntil : "networkidle0"}
    )]);
    return combinedPromise;
})
console.log("AFTER!")
