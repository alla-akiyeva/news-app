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

            //$(".wsj-headline a.wsj-headline-link").each((index, title) => {
            $("article .WSJTheme--headline--unZqjb45 a").each((index, title) => {
                
            

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
            
            // db.Article.remove({}).exec()
            db.Article.deleteMany({});

            db.Article.create(articlesArr) 
            .catch(err => {
                console.log(err);
            });

            // console.log("articles array" + articlesArr);
            // console.log(articlesArr.length);
            res.render("index", objScraped);

        }).catch(err => {
            res.json(err)
        });
    });

    app.get("/", (req, res) => {
        db.Article.find({})
        .then(articles => {
            let objArticles = {
                articles: articles
            }
            res.render("index", objArticles);
        }).catch(err => {
            res.json(err)
        });
    })

    app.post("/save/:id", (req, res) => {
        //console.log(req.params);
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

    // app.post("/savenote/:id", (req, res) => {
    //     const id = req.params.id;
        
    //     console.log("This is id 79: ", id);
    //     console.log("This is params 80: ", req.params);
    //     console.log("This is body 81: ", req.body);

    //     db.Article.findOne(
    //         {"id": id}
    //     )
    //     .populate("notes")
    //     .then(function(dbArticle) {
    //         res.json(dbArticle)
    //     })
    //     .catch(function(err) {
    //         console.log(err);
    //     });
    // });

    app.post("/savenote/", (req, res) => {
        db.Note.create(req.body)
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            res.json(err);
        })
    });


    app.get("/clear", (req, res) => {
        db.Article.deleteMany({
            saved: false
        })
        .then(() => {
            res.render("index");
            // res.redirect("/");
        }). catch(err => {
            res.json(err)
        });
    })

    // New query about finding notes associated with a single article
    app.get("/article-notes/:articleId", (req, res) => {

        db.Note.find({
            articleId: req.params.articleId
        })
        .then(notes => {
            // let objNotes = {
            //     notes: notes
            // }
            // res.render("saved", objNotes);
            // console.log(notes.map(x => x*2));
            
            //console.log(notes[0].title);
            res.json(notes);
        })
        .catch (err => {
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
            // res.json(article);
        })
        .catch (err => {
            res.json(err)
        });
    })

    app.delete("/delete/:id", (req, res) => {
        db.Article.deleteOne({
            id: req.params.id
        })
        .then(() => {
            res.json("Article deleted!");
        }).catch (err => {
            res.json(err)
        });
    })
    
}

// DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.

