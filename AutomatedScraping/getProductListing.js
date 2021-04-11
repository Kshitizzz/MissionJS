// TASK 
// go to each website and search for the input product 
// scrape and print the model and price of the first five listing on the console
// how to use - enter in the terminal --> node getProductListing <product_name>

let puppeteer = require("puppeteer");
let fs = require('fs');
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://www.snapdeal.com"];
let productName = process.argv.slice(2)[0]; // will accept the name of the product as an input in the terminal

(async function(){
    try{
        let browserInstance = await puppeteer.launch({ //puppeteer.launch returns a promise, hence await for it
            headless : false,
            defaultViewport : null,
            args : ["--start-maximized"]
        });
        //let amazonArr = await getListingFromAmazon(links[0], browserInstance, productName); // pass the url, browser object and product you wanna search for
        //console.table(amazonArr);
        let flipkartArr = await getListingFromFlipkart(links[1], browserInstance, productName);
        //console.table(flipkartArr);

    }catch(err){
        console.log(err);
    }
})(); // IIFE function --> run immediately post defining

async function getListingFromAmazon(url, browserInstance, productName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(url);
    await newTab.type("#twotabsearchtextbox", productName);
    await newTab.click("#nav-search-submit-button");
    await newTab.waitForSelector(".a-price-whole", {visible : true});
    await newTab.waitForSelector(".a-size-medium.a-color-base.a-text-normal", {visible : true});
    function browserconsolerunFn(priceSelector, nameSelector){
        let allIphoneElements = document.querySelectorAll(nameSelector);
        let allPriceElements = document.querySelectorAll(priceSelector);
        let iphones = []
        for(let idx = 0; idx < 4; idx++){
            console.log("In for loop,", idx);
            let iphone = allIphoneElements[idx].innerText;
            let price = allPriceElements[idx].innerText;
            iphones.push({iphone, price});
        }
        return iphones;
    }
    return newTab.evaluate(browserconsolerunFn, ".a-price-whole", ".a-size-medium.a-color-base.a-text-normal");
}

async function getListingFromFlipkart(url, browserInstance, productName){
    // open a new page in the browser
    console.log(productName);
    let newPage = await browserInstance.newPage(); // returns a promise hence use await
    // gp to the url on the newPage
    await newPage.goto(url);
    await newPage.waitForSelector('._2KpZ6l._2doB4z');
    await newPage.click("._2KpZ6l._2doB4z");
    await newPage.waitForSelector("._3OO5Xc");
    await newPage.type("._3704LK", productName, {delay : 200});
    return newPage.click(".L0Z3Pu");
}
