// Requiring our models for syncing
// =============================================================
const db = require("../models");


let controller = {
	get_home_page: (req , res) => {
		db_controller.get_body(req.params.id)
			.then(data => {
				res.render("takeT" , {
								        title: 'quizomatic | home',
								        subtitle: 'the latest in assessment',
										script: 'testTake',
										testObj: data.body
								  	}
				);
			});
	},
	post_comment: (req, res) => {
		let test_array = [];
		db_controller.get_test_by_name(req.params.name)
			.then(data => {
				res.render("takeT" , {
								        title: 'quizomatic | home',
								        subtitle: 'the latest in assessment',
										script: 'testTake',
										testObj: data.body
								  	}
				);

			});
    },
};

module.exports = controller;