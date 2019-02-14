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


//------------------------------SiD

//Import the mongoose module
// var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://kriti:password123@ds259732.mlab.com:59732/yelp_camp';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//-----------------------------------------
//seedDB(); //seed the database
// console.log(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true});

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