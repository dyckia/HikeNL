const router = require("express").Router();
const Trail = require("../models/trail.js");
const Comment = require("../models/comment.js");
const middleware = require("../middleware");

// INDEX route
router.get("/", (req, res) => {
    Trail.find({}, (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.render("trails/index", {trails: results});
		}
	})
});

// CREATE route
router.post("/", middleware.isLoggedIn, (req, res) => {
    const name = req.body.trailName;
    const image = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.trailDesc;
    const newTrail = req.body.trail;
	newTrail.author = {id: req.user._id, username: req.user.username};
    Trail.create(newTrail, (err, newTrail) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/trails");
		}
	});
});

// NEW route
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("trails/new");
})

// SHOW route
router.get("/:trailId", (req, res) => {
	Trail.findById(req.params.trailId).populate("comments").exec( (err, foundTrail) => {
		if (err) {
			console.log(err);
		} else {
			res.render("trails/show", {trail: foundTrail});
		}
	});
});

// EDIT route
router.get("/:trailId/edit", middleware.isLoggedIn, middleware.checkTrailOwnership, (req, res) => {
	Trail.findById(req.params.trailId, (err, foundTrail) => {
        res.render("trails/edit", { trail: foundTrail});
	});
});

// UPDATE route
router.put("/:trailId", middleware.isLoggedIn, middleware.checkTrailOwnership, (req, res) => {
	Trail.findByIdAndUpdate(req.params.trailId, req.body.trail, (err, updatedTrail) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/trails/${req.params.trailId}`);
		}
	});
});

// DESTORY route
router.delete("/:trailId", middleware.isLoggedIn, middleware.checkTrailOwnership, (req, res) => {
    Trail.findByIdAndRemove(req.params.trailId, (err, removedTrail) => {
        if (err) {
            console.log(err);
        } else {
            // remove all comments associated
            Comment.deleteMany({_id: {$in: removedTrail.comments}}, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/trails");
                }
            });
        }
    });
});

module.exports = router;