
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

    });

    
    // "Save" button event
    $(".btn-small").on("click", function () {

        // Grab the id of the article displayed
        // Set "saved" to true in the db

        // let articleTitle = $(this).parent().siblings().children().text();
        // console.log(articleTitle);

        let articleId = $(this).data("id");
        console.log(articleId);

        $.ajax({
            method: "POST",
            url: "/save/" + articleId
        })
        .then(function(data) {
            console.log(data);
            $(this).text("Saved ✔")
        })

        //$(this).text("Saved ✔")
    })


});