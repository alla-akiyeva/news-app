const express = require("express")
const exphbs = require("express-handlebars")
const PORT = process.env.PORT || 5000
const api_routes = require("./routes/api_routes")
const mongoose = require("mongoose")

const app = express()

app.use(express.static("public"))

app.engine("handlebars", exphbs( {defaultLayout: "main" }))
app.set("view engine", "handlebars");

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, 
    {useNewUrlParser: true},
    function () {
        console.log("connected to server");

        api_routes(app);

        app.listen(PORT, () => console.log("Listening on PORT %s", PORT))
    });





