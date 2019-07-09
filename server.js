const express = require("express")
const PORT = 5000
const api_routes = require("./routes/api_routes")
const mongoose = require("mongoose")
const db = require("")

const app = express()

api_routes(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", {useNewUrlParser: true});

// Routes


app.listen(PORT, () => console.log("Listening on PORT %s", PORT))