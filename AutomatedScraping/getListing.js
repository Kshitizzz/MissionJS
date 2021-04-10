let puppeteer = require("puppeteer");
let fs = require('fs');
let links = ["https://www.amazon.in", "www.flipkart.com", "www.snapdeal.com"];

(async function(){
    try{
        let browserInstance = await puppeteer.launch({
            headless : false,
            defaultViewport : null,
            args : ["--start-maximized"]
        });
        let amazonArr = await getListingFromAmazon(links[0], browserInstance, "iphone");
        console.log(amazonArr);
    }catch(err){
        console.log(err);
    }
})();

async function getListingFromAmazon(url, browserInstance, productName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(url);
    await newTab.type("#twotabsearchtextbox", productName, {delay : 200});
    await newTab.click("#nav-search-submit-button");
    await newTab.waitForSelector(".a-price-whole", {visible : true});
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
