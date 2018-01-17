const db = require("../models");
const cheerio = require("cheerio");
const request = require("request");


let controller = {
    post_comment: (req, res) => {
    	
    	let comment = {
    		text: req.body.text,
    		date: req.body.date

    	}
    	db.Article.update({_id: req.body.article} , { $addToSet: { comments: comment } })
            .then(data => {
                console.log(data);
                res.send("Comment submitted");
            })
            .catch(err => {
                res.send("error occured")
            });

    },
    scrape: (req, res) => {

        // Making a request for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
        request("http://www.sandiegouniontribune.com/news/", function(error, response, html) {

            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            const $ = cheerio.load(html);

            // An empty array to save the data that we'll scrape
            const results = [];

            // With cheerio, find each p-tag with the "title" class
            // (i: iterator. element: the current element)

            $("li.trb_outfit_group_list_item").each(function(i, element) {

                // Save the text of the element in a "title" variable

                let title = $(element).find('section').find('h3').find('a').text();

                // In the currently selected element, look at its child elements (i.e., its a-tags),
                // then save the values for any "href" attributes that the child elements may have
                let link = "http://www.sandiegouniontribune.com" + $(element).find('a').attr("href");
                // Save these results in an object that we'll push into the results array we defined earlier
                results.push({
                    link: link,
                    title: title,
                });
            });


            db.Article.insertMany(results, { ordered: false })
                .then(data => {
                    console.log("New scrape request and insert successful!");
                    res.send("" + data.length + "");
                })
                .catch(err => {
                	console.log("Nothing has been inserted after scrape!");
                    res.send(false);
                });

        });

    },
    home: (req, res) => {
        db.Article.find()
            .then(data => {
                res.render("news", {
                    title: 'Welcome to News Scraper',
                    script: 'newsScrape',
                    data: data
                });
            })
            .catch(err => {
                res.send("error occured")
            });
    }
};

module.exports = controller;