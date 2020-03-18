const router = require("express").Router({mergeParams: true});
const Trail = require("../models/trail.js");
const Comment = require("../models/comment.js");
const middleware = require("../middleware");

// NEW route
router.get("/new", middleware.isLoggedIn, (req, res) => {
	Trail.findById(req.params.trailId, (err, trail) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {trail: trail});
		}
	});
});

// CREATE route
router.post("/", middleware.isLoggedIn, (req, res) => {
	Trail.findById(req.params.trailId, (err, trail) => {
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
					trail.comments.push(comment);
					trail.save();
					res.redirect(`/trails/${trail._id}`);
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
			res.render("comments/edit", {trailId: req.params.trailId, comment: foundComment});
		}
	});
});

// UPDATE route
router.put("/:commentId", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/trails/${req.params.trailId}`);
		}
	});
});

// DESTROY route
router.delete("/:commentId", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.commentId, (err) => {
		if (err) {
			console.log(err);
		} else {
            Trail.findByIdAndUpdate(req.params.trailId, {
                $pull: {comments: req.params.commentId}
            }, (err, updatedTrail) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect(`/trails/${req.params.trailId}`);
                }
            });
		}
	});
});

module.exports = router;