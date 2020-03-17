const router = require("express").Router();
const Campground = require("../models/campground.js");
const Comment = require("../models/comment.js");
const middleware = require("../middleware");

// INDEX route
router.get("/", (req, res) => {
	Campground.find({}, (err, results) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: results});
		}
	})
});

// CREATE route
router.post("/", middleware.isLoggedIn, (req, res) => {
    const name = req.body.campName;
    const image = req.body.imgUrl;
    const price = req.body.price;
	const description = req.body.campDesc;
	const author = {id: req.user._id, username: req.user.username}
	const newCampground = {name: name, image: image, price: price, description: description, author: author};
	Campground.create(newCampground, (err, newCampground) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// NEW route
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

// SHOW route
router.get("/:campId", (req, res) => {
	Campground.findById(req.params.campId).populate("comments").exec( (err, foundCamp) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
});

// EDIT route
router.get("/:campId/edit", middleware.isLoggedIn, middleware.checkCampOwnership, (req, res) => {
	Campground.findById(req.params.campId, (err, foundCamp) => {
		res.render("campgrounds/edit", {campground: foundCamp});
	});
});

// UPDATE route
router.put("/:campId", middleware.isLoggedIn, middleware.checkCampOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.campId, req.body.campground, (err, updatedCamp) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/campgrounds/${req.params.campId}`);
		}
	});
});

// DESTORY route
router.delete("/:campId", middleware.isLoggedIn, middleware.checkCampOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.campId, (err, removedCamp) => {
        if (err) {
            console.log(err);
        } else {
            // remove all comments associated
            Comment.deleteMany({_id: {$in: removedCamp.comments}}, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

module.exports = router;