const router = require("express").Router() 
const passport = require("passport");
const User = require("../models/user.js")

router.get("/", (req, res) => {
    res.render("landing");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
			// console.log(err);
			req.flash("error", `${err.message}.`);
			return res.redirect("/register");
		}

        passport.authenticate("local")(req, res, ()=> {
			req.flash("success", "You have successfully created an account!");
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
	successFlash: "You have successfully logged in!",
    failureRedirect: "/login",
	failureFlash: true
}));

router.get("/logout", (req, res) => {
    req.logout();
	req.flash("success", "You have successfully logged out!");
    res.redirect("/");
});

module.exports = router;