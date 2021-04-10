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
        await getListingFromAmazon(links[0], browserInstance, "iphone");
    }catch(err){
        console.log(err);
    }
})();

async function getListingFromAmazon(url, browserInstance, productName){
    let newTab = await browserInstance.newPage();
    await newTab.goto(url);
    await newTab.type("#twotabsearchtextbox", productName, {delay : 200});
    await newTab.click("#nav-search-submit-button");

    function browserconsolerunFn(){
        let allIphoneElements = document.querySelectorAll("class='a-size-medium a-color-base a-text-normal'");
        let iphoneNames = []
        for(let idx = 0; idx < 5; idx++){
            iphoneNames.push(allIphoneElements.innerText);
        }
        console.log(iphoneNames);
    }
    await newTab.evaluate(browserconsolerunFn)
}
