


$(document).ready(() => {

    $(".forumPostButton").on("click", (e) => {
        let article_id = $(e.target).attr("article-id");
        let comment = $("textarea#ta" + article_id).val().trim();

        if (comment !== '') {
            $.ajax("/comment", {
                type: "POST",
                data: {text: comment, article: article_id, date: new Date()}
            }).then(function(results) {
            	console.log(results);
            	// location.reload();
            });
            $("ol#ol" + article_id)
            .append(
                "<li class=\"list-group-item\">" + 
                    "<div>" +
                        comment +          
                        "<br>" +
                        "<br>" +
                        "<br>" +
                        "<br> Posted: " + new Date() +
                    "</div>" +
                "</li>"
            );
        }
        $("textarea#ta" + article_id).val("");

    });

    $("#scraper").on("click", () => {
        $.ajax("/scrape", {
            type: "GET",
        }).then(function(results) {
        	if (results) $("#scrapeMsg").text(results + " new articles have been added to the list! Check them out by refreshing!")
        	else  $("#scrapeMsg").text("No new articles have been scraped. Check back later!");
        	$("#resultsModal").modal('toggle');
            
        });
    });

    $(".save-link").on("click", (e) => {
        let article_id = $(e.target).attr("article-id");

        
        $.ajax("/save", {
            type: "POST",
            data: {article: article_id , saved: true}
        }).then(function(results) {
            console.log(results);
        });

    });

    $(".remove-link").on("click", (e) => {
        let article_id = $(e.target).attr("article-id");

        
        $.ajax("/save", {
            type: "POST",
            data: {article: article_id , saved: false}
        }).then(function(results) {
            console.log(results);
        });

    });

    $("#closer").on("click" , () => {
        location.reload();
    })

});