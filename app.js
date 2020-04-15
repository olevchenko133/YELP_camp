// VARS SETUP
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment"),
    methodOverride = require("method-override")


// ROUTES
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


// mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.connect("mongodb+srv://admin:olga1507@cluster0-a3uuf.mongodb.net/test?retryWrites=true&w=majority");




app.use(bodyParser.urlencoded({ extended: true }), express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


// PASSPORT CONFIG

app.use(require("express-session")({
    secret: "Love Koalas",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





// DEFINE USE + SET
app.set("view engine", "ejs");

app.use(function (req, res, next) {

    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success= req.flash("success");

    next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// START THE SERVER!!!!!
app.listen(3000, function () {


    console.log("YELP is working")
});