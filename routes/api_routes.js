const cheerio = require("cheerio");
const axios = require("axios");


module.exports  = function (app) {
    const db = require("../models/Article");
    
    app.get("/scrape", (req, res) => {

        const articlesArr = [];

        // Get the html from wsj.com
        axios.get("https://www.wsj.com/news/technology")
        .then(response => {
         // Turn that html into a jQuery like DOM
            const $ = cheerio.load(response.data);
            

            let titlesArr = [];

         // Search the DOM using jQuery-like features to find articles
            $(".wsj-headline a.wsj-headline-link").each((index, title) => {
                
                const article = {};
    
                article.title = $(title).text();
                article.link = $(title).attr("href");

                if (titlesArr.indexOf(article.title) == -1 ) {
                    titlesArr.push(article.title);
                    articlesArr.push(article);
                }
            
            });
            
            db.remove({})

            db.create(articlesArr) 
            .catch(err => {
                console.log(err);
            });

            

            console.log(articlesArr);
            console.log(articlesArr.length);

        });

        res.render('index', articlesArr);
        
    });

    app.get("/home", (req, res) => {
        db.find({})
        .then(article => {
            res.render('index', {article});
        }).catch(err => {
            res.json(err)
        });
    })

    app.get("/articles", (req, res) => {
        db.find({})
        .then(article => {
             json(article);  
        }).catch(err => {
            res.json(err)
        })
    });

    // app.get("/articles/:id", (req, res) => {
    //     db.findOne({_id: req.params.id })
    //     .populate("note")
    //     .then(article => {
    //         res.json(article);
    //     }).catch(err => {
    //         res.json(err);
    //     })
    // })

    // app.post("/articles/:id", (req, res) =>
    //     db.
    // )
    
}

