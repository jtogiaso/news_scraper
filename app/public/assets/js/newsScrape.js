


$(document).ready(() => {

    $(".forumPostButton").on("click", (e) => {
        let article_id = $(e.target).attr("article-id");
        let comment = $("textarea#" + article_id).val().trim();

        if (comment !== '') {
            $.ajax("/comment", {
                type: "POST",
                data: {text: comment, article: article_id, date: new Date()}
            }).then(function(results) {
            	console.log(results);
            	// location.reload();
            });
        }
        $("textarea#" + article_id).val("");
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
});