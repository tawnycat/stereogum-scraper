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

            .then(function(data) {
                console.log(data);
                $("#viewCommentTitle").text(data.title);
                $("#viewCommentBody").text(data.body);
                $("#viewCommentModal").modal({
                    show: true
                });
            });
    });

    // "Leave comment" modal

    $(".leaveComment").on("click", function() {

        var thisId = $(this).attr("data-id");
        $("#leaveCommentModal").attr("data-id", thisId);
        $("#leaveCommentModal").modal({
            show: true
        });
    });

    // Submit comment

    $("#commentSubmit").on("click", function() {

        var thisId = $("#leaveCommentModal").attr("data-id");

        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {

                    title: $("#commentTitle").val(),

                    body: $("#commentBody").val()
                }
            })

            .then(function(data) {

                console.log(data);

            });

        $("#commentTitle").val("");
        $("#commentBody").val("");
    })

});