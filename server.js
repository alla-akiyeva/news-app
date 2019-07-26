const express = require("express")
const exphbs = require("express-handlebars")
const PORT = process.env.PORT || 5000
const api_routes = require("./routes/api_routes")
const mongoose = require("mongoose")

const app = express()

app.engine("handlebars", exphbs())
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/news_db", 
    {useNewUrlParser: true},
    function () {
        console.log("connected to server");

        api_routes(app);

        if (process.env.NODE_ENV === "production") {
            app.use(express.static("client/build"));
        }
           

        app.listen(PORT, () => console.log("Listening on PORT %s", PORT))
    });





