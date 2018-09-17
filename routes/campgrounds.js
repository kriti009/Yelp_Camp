var express = require("express");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var router = express.Router();
var middleware = require("../middleware")

//INDEX ROUTE
router.get("/", function(req, res){
   //Get all campgrounds from db
   //req.user to get all info about user 
   Campground.find({}, function(err, allCampgrounds){
      if(err){
         console.log(err);
      }else{
         res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});      
      }
   });
});

//CREATE ROUTE
router.post("/",middleware.isLoggedIn , function(req, res){
   //get data from form and add to array
   var name = req.body.name;
   var url = req.body.image;
   var descrip = req.body.description;
   var author={
       id: req.user._id,
       username: req.user.username
   };
   var price = req.body.price;
   var newCampground = {name: name ,price: price, image: url, description: descrip , author: author};
   Campground.create(newCampground, function(err, newlyCreatedCampgrounds){
      if(err){
         console.log(err);
      }else{
         res.redirect("/campgrounds");      
      }
   });
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn ,function(req, res){
   res.render("campgrounds/new");
});

//SHOW Route - shows more info about one campground
router.get("/:id", function(req, res){
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
         console.log(err);
      }else{
         // console.log(req.params.id);
         // console.log(foundCampground);
         res.render("campgrounds/show", {campground: foundCampground});      
      }
   });
});

//Edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
      if(foundCampground.author.id.equals(req.user._id)){
         res.render("campgrounds/edit", {campground: foundCampground});    
      }
   });
});
//Update route
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
   var campground = req.body.camp;
   Campground.findByIdAndUpdate(req.params.id, campground, function(err, udatedCampground){
      if(err){
         console.log(err);
         res.redirect("/campgrounds/"+req.params.id);
      }else{
         res.redirect("/campgrounds/"+req.params.id);
      }
   })
});
//Destroy route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
         res.redirect("/campgrounds/"+req.params.id);
      }else{
         res.redirect("/campgrounds");
      }
   })
});


module.exports = router ; 