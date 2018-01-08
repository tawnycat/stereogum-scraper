// Makes the scrape button work

$(document).ready(function() {

    $("#scrape-button").on("click", function() {
        console.log("it's clickin");
        $.ajax({
                method: "GET",
                url: "/scrape"
            })
            .then(function(data) {
                location.reload();
            })
    });



    // Brings up "view comments" modal

    $(".viewComments").on("click", function() {

        console.log("clickin for a modal");

        $("#commentModalBody").empty();

        var thisId = $(this).attr("data-id");

        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // With that done, add the note information to the page
            .then(function(data) {
                console.log(data);
                $("#viewCommentTitle").text(data.title);
                $("#viewCommentBody").text(data.body);
                $("#viewCommentModal").modal({
                    show: true
                });
            });
    });

    // When you click the savenote button
    $(".leaveComment").on("click", function() {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        $("#leaveCommentModal").attr("data-id", thisId);
        $("#leaveCommentModal").modal({
            show: true
        });
    });

    $("#commentSubmit").on("click", function() {
        // Run a POST request to change the note, using what's entered in the inputs

        var thisId = $("#leaveCommentModal").attr("data-id");

        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from title input
                    title: $("#commentTitle").val(),
                    // Value taken from note textarea
                    body: $("#commentBody").val()
                }
            })
            // With that done
            .then(function(data) {
                // Log the response
                console.log(data);
                // Empty the notes section
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#commentTitle").val("");
        $("#commentBody").val("");
    })

});