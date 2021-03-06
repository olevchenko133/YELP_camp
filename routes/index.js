var express = require("express");
var router = express.Router();
var  passport = require("passport");
var User = require("../models/user");

// ROUTES
router.get("/", function (req, res) {
    res.render("landing");
});





// REGISTER ROUTE
// RREGISTER ------ GET
router.get("/register", function (req, res) {
    res.render("register");
})
// REGISTER POST

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password , function(err, User){
        if(err){
     
            req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });

});




// LOGIN ROUTE
// login ------ GET
router.get("/login", function (req, res) {

 
    res.render("login");
})

router.post("/login", passport.authenticate("local",{
successRedirect: "/campgrounds",
failureRedirect: "/login"
}), function(req, res){

});
// LOGOUT ROUTE

router.get("/logout", function(req, res){
req.logout();
req.flash("success", "Logged you out");
res.redirect("/campgrounds");
});



module.exports = router;