// load dot env variables
require('dotenv').config()

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const methodOverride = require("method-override");
const flash = require("connect-flash");
const PORT = process.env.PORT || 3000;

const indexRouter = require("./routes/index.js");
const campgroundRouter = require("./routes/campgrounds.js");
const commentRouter = require("./routes/comments.js");

mongoose.connect(process.env.HIKEDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "love nature",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));
app.use(flash());

// custom middleware to keep track of user information
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
	res.locals.successMessage = req.flash("success");
	res.locals.errorMessage = req.flash("error");
    next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// // seed the database
// const seedDB = require("./seed");
// seedDB();

app.use("/", indexRouter);
app.use("/campgrounds", campgroundRouter);
app.use("/campgrounds/:campId/comments", commentRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});