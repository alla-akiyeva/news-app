const cheerio = require("cheerio");
const axios = require("axios");

module.exports  = function (app) {
    app.get("/", (req, res) => {
        res.send("some text");
        // Get the html from wsj.com
        axios.get("https://www.wsj.com/news/technology")
        .then(res => {
         // Turn that html into a jQuery like DOM
            const $ = cheerio.load(res.data);

         // Search the DOM using jQuery-like features to find articles
            // $(".wsj-headline-link href")
            // $('#fin-src-res-table td[aria-label="Name"]')
            
            $(".wsj-headline a").each((index, title) => {
                const headline = $(title).text();
                console.log(headline);
            });
    


        }).catch(err => console.log(err));    

        
    })
}

