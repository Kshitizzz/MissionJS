// input the username of an instagram profile, goto it, and like the mentioned number of posts there
// (also print the names that were liked)
// goto https://instagram.com --> click on the search bar --> type the username(exact)
// click on the top search result --> go to the profile
// like the mentioned number of posts --> store description of each liked post in an arr
// print that arr 

let puppeteer = require('puppeteer');
let fs = require('fs');
let {username, password} = require("./crediantials.js");

let userName = process.argv.slice(2)[0];
let numberOfPostsToLike = process.argv.slice(2)[1];

(async function(){
    let browserInstance = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"]
    });

    let newPage = await browserInstance.newPage();
    await newPage.goto("https://www.instagram.com");
    let usernameInputSelector = "input[name = 'username']";
    let passwordSelector = "input[name = 'password']";
    let loginButtonSelector = "button[type= 'submit']";
    let searchBarSelector = "input[type = 'text']";

    try {
        await newPage.waitForSelector(usernameInputSelector);
        await newPage.waitForSelector(passwordSelector);
        await newPage.type(usernameInputSelector, username, {delay : 200});
        await newPage.type(passwordSelector, password, {delay : 200});
        await newPage.waitForSelector(loginButtonSelector);
        await newPage.click(loginButtonSelector, {delay : 200});
        await newPage.waitForNavigation();
        await newPage.waitForSelector("button[type = 'button']") 
        await newPage.click("button[type = 'button']")
        await newPage.waitForNavigation();
        await newPage.waitForSelector(".aOOlW.HoLwm");
        await newPage.click(".aOOlW.HoLwm");
        await newPage.waitForSelector(searchBarSelector);
        await newPage.type(searchBarSelector, userName, {delay : 200});
        await newPage.waitForSelector("a[class = '-qQT3']", {visible : true});
        await newPage.click("a[class = '-qQT3']");
        // wait for post selector to show up/load
        await newPage.waitForSelector('div[class="u7YqG"]');
        await newPage.click('div[class="u7YqG"]');
        
        while(numberOfPostsToLike > 0){
            console.log("NUMBER OF POSTS LEFT TO LIKE :: ", numberOfPostsToLike);
            // wait for like button to show up
            await newPage.waitForSelector('.ltpMr.Slqrh .fr66n .wpO6b');
            // click the like button
            await newPage.click('.ltpMr.Slqrh .fr66n .wpO6b');
            // click the next post button
            await newPage.click('._65Bje.coreSpriteRightPaginationArrow');
            // reduce the counter
            numberOfPostsToLike -= 1;
            }
    }catch(err) {console.log(err)};
})()


