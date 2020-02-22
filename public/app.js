// import { json } from "express";

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

    $("#home").on("click", function () {
        $.ajax ({
            method: "GET",
            url: "/",
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
    });

    // "Saved Articles" button event
    $("#savedArticles").on("click", function () {

        $.ajax ({
            method: "GET",
            url: "/saved/"
        })
        .then(function (data) {
            console.log(data);
        })
        .catch (function (err) {
            console.log(err);
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
            $(this).text("Saved ✔")
        })
        .catch (function (err) {
            console.log(err);
        })
    });

    $(".delete").on("click", function () {
        let articleId = $(this).data("id");
        console.log("Article id: " + articleId);
        $(this).text("Deleted");

        $.ajax({
            method: "DELETE",
            url: "/delete/" + articleId,
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log(err);
        })
    })

    $(".modal-trigger").on("click", function () {
        
        $("#alert").text("");
        $("#note-title").val("");
        $("#note-input").val("");
            
        $(".modal").modal();
        // var title = $(this).parent().siblings().children().text();
        var title = $(this).parent().siblings().find($(".title")).text();
        var id = $(this).data("id");

        // console.log(title);
        // console.log("Id: " + id);

        // let articleId = $(this).data("id");
        // console.log(articleId);

        // $.ajax({
        //     method: "GET",
        //     url: "/articles/saved/" + articleId,
        // })
        // .then(function (data) {
        //     console.log(data);
        // })

        $("#modal1").find(".modal-title").text(title);
        $("#modal1").find("#save-note-btn").data("id", id);
    })

    

    $("#save-note-btn").on("click", function () {
        // Date formatted with Moment.js
        const date = moment(new Date()).format("MM/DD/YYYY");
        const articleId = $(this).data("id");

        const note =  {};
            note.title = $("#note-title").val();
            note.date = date; 
            note.body = $("#note-input").val();

        console.log(note);

        if ((note.title || note.body) == "") {
            $("#alert").text("Please enter both the note and a title.");
        } else {
            $.ajax({
                method: "POST",
                url: "/savenote/" + articleId,
                data: {
                    note: note
                }
            })
            .then(function(data) {
                console.log(data);
            })
            .catch(function (err) {
                console.log(err);
            });

            $("#alert").text("A note has been added!");

        }


    });

});