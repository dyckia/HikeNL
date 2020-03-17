const Campground = require("../models/campground.js");
const Comment = require("../models/comment.js");

middlewareObj = {};

// middleware for checking user login status
middlewareObj.isLoggedIn =  function(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	
	req.flash("error", "You need to login first.");
	res.redirect("/login");
}

// middleware for checking a campground's ownership
middlewareObj.checkCampOwnership = function(req, res, next) {
	Campground.findById(req.params.campId, (err, foundCamp) => {
		if(foundCamp.author.id.equals(req.user._id)) {
			return next();
		}
		
		req.flash("error", "You're not authorized to edit/delete the campground.")
		res.redirect("back");
	});
}

// middleware for checking a comment's ownership
middlewareObj.checkCommentOwnership = function(req, res, next) {
	Comment.findById(req.params.commentId, (err, foundComment) => {
		if (foundComment.author.id.equals(req.user._id)) {
			return next();
		}
		
		req.flash("error", "You're not authorized to edit/delete the comment.")
		res.redirect("back");
	});
}

module.exports = middlewareObj;