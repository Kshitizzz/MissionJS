let cheerio = require('cheerio');
let request = require('request');


function getBirthDate(url){
    request(url, cb); 
    function cb(error, response, html){ 
        if(error) console.log(error);
        else{
            let selectorTool = cheerio.load(html);
            let player_info = selectorTool("p.ciPlayerinformationtxt")
            //console.log(player_info.length)
            let birth_data = selectorTool(player_info[1]).find(" span ").text().split("\n")
            console.log(birth_data.pop());
            return birth_data;
        };
}
}

console.log(getBirthDate("https://www.espncricinfo.com/australia/content/player/325012.html"));