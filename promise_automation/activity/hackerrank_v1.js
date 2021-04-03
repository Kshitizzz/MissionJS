let puppeteer = require("puppeteer");
let { password, email } = require("./secrets");
let fs = require("fs");
let gtab;

console.log("Before");

let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized",]
})
// /pages
browserPromise
    .then(function (browserInstance) {
        let newTabPromise = browserInstance.newPage();
        return newTabPromise;
    })
    .then(function (newTab) {
        // console.log(newTab);
        let loginPageWillBeopenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        gtab = newTab;
        return loginPageWillBeopenedPromise;
    })
    .then(function () {
        // console.log("login Page opened");
        let emailWillBeTypedPromise = gtab.type("#input-1", email, { delay: 200 });
        return emailWillBeTypedPromise;
    }).then(function () {
        let passwordWillBeTypedPromise = gtab.type("#input-2", password, { delay: 200 });
        return passwordWillBeTypedPromise;
    }).then(function () {
        let loginPageWillBeClickedpromise = gtab.click("button[data-analytics='LoginPassword']");
        loginPageWillBeClickedpromise;
    })
    .then(function () {
        let clickIPKIt = waitAndClick(".card-content h3[title='Interview Preparation Kit']");
        return clickIPKIt;
    })
    .then(function () {
        let warmupClick = waitAndClick("a[data-attr1='warmup']");
        return warmupClick;
    })
    .catch(function (err) {
        console.log(err);
    })
// promise based function -> wait and click
function waitAndClick(selector) {
    return new Promise(function (resolve, reject) {
        let selectorWaitPromise =
            gtab.waitForSelector(selector, { visible: true });
        selectorWaitPromise
            .then(function () {
                let selectorClickPromise = gtab.click(selector);
                return selectorClickPromise;
            }).then(function () {
                resolve();
            })
    })
}


console.log("After");