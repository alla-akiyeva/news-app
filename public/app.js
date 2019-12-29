
$(document).ready(function () {

    // "Scrape" button event
    // $("#scrape").on("click", function () {
    //     $.ajax({
    //         method: "GET",
    //         url: "/scrape"
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //     })
    // });

    // "Saved Articles" button event
    $("#savedArticles").on("click", function () {

        $.ajax ({
            method: "GET",
            url: "/saved/"
        })
        .then(function (data) {
            console.log(data);
        })

    });

    
    // "Save" button event
    $(".save").on("click", function () {

        // Grab the id of the article displayed
        // Set "saved" to true in the db

        // let articleTitle = $(this).parent().siblings().children().text();
        // console.log(articleTitle);

        let articleId = $(this).data("id");
        console.log(articleId);

        $(this).text("Saved ✔")

        $.ajax({
            method: "POST",
            url: "/save/" + articleId,
            data: {
                id: articleId
            }
        })
        .then(function(data) {
            console.log(data);
            //$(this).text("Saved ✔")
        })
    })


});