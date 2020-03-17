const router = require("express").Router({mergeParams: true});
const Campground = require("../models/campground.js");
const Comment = require("../models/comment.js");
const middleware = require("../middleware");

// NEW route
router.get("/new", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.campId, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// CREATE route
router.post("/", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.campId, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) {
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect(`/campgrounds/${campground._id}`);
				}
			});
		}
	});
});

// EDIT route
router.get("/:commentId/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.commentId, (err, foundComment) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/edit", {campId: req.params.campId, comment: foundComment});
		}
	});
});

// UPDATE route
router.put("/:commentId", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/campgrounds/${req.params.campId}`);
		}
	});
});

// DESTROY route
router.delete("/:commentId", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.commentId, (err) => {
		if (err) {
			console.log(err);
		} else {
            Campground.findByIdAndUpdate(req.params.campId, {
                $pull: {comments: req.params.commentId}
            }, (err, updatedCampground) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect(`/campgrounds/${req.params.campId}`);
                }
            });
		}
	});
});

module.exports = router;