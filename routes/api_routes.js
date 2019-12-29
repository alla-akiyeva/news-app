const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

module.exports  = function (app) {
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
                article.id = index;
                article.title = $(title).text();
                article.link = $(title).attr("href");

                if (titlesArr.indexOf(article.title) == -1 ) {
                    titlesArr.push(article.title);
                    articlesArr.push(article);
                }
            });

            let objScraped = {
                articles: articlesArr
            }
            
            //db.Article.remove({}).exec()

            db.Article.create(articlesArr) 
            .catch(err => {
                console.log(err);
            });

            console.log(articlesArr);
            console.log(articlesArr.length);
            res.render("index", objScraped);

        }).catch(err => {
            res.json(err)
        });
    });

    app.get("/", (req, res) => {
        db.Article.find({})
        .then(article => {
            res.render("index", {article});
        }).catch(err => {
            res.json(err)
        });
    })

    app.post("/save/:id", (req, res) => {
        console.log(req.params);
        db.Article.updateOne(
            { "id": req.params.id},
            {"saved": true}
        )
        .then(function () {
            res.send("Article saved!");
        })
        .catch(function (err) {
            res.json(err)
        })
    });

    app.get("/clear", (req, res) => {
        db.Article.deleteMany({
            saved: false
        })
        .then(() => {
            //res.render("index");
            res.redirect("/");
        }). catch(err => {
            res.json(err)
        });
    })

    app.get("/saved", (req, res) => {
        db.Article.find({
            saved: true
        })
        .then(articles => {
            let objSaved = {
                articles: articles
            }
            res.render("saved", objSaved);
            //res.json(article);
        }).catch (err => {
            res.json(err)
        });
    })



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

