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
    return loginButtonWillBeClickedPromise;
})
.then(function(){
    console.log("Login done!");
})
.catch(function(err){
    console.log(err);
})

console.log("After!");