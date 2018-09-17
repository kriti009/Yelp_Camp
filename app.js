var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var mongoose = require("mongoose"),
    methodOverride = require("method-override");
var passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB   = require("./seeds");

//requiring Routes
var commentRoutes = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    indexRoutes = require("./routes/index.js");

//seedDB(); //seed the database
console.log(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true});
// mongoose.connect("mongodb://yelpcamp:password123@ds259732.mlab.com:59732/yelp_camp");
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());

//Passport configuration
app.use(require("express-session")({
   secret: "hate you!!",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments" , commentRoutes);


app.get("*", function(req, res){
   res.send("Page Does Not Exists");
});

app.listen(process.env.PORT, process.env.ID, function(){
   console.log("The YelpCamp Server has Started!"); 
});