var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
   //is user logged in
   if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
         if(err){
            req.flash("error", "Campground Not Found");
            res.redirect("back");
         }else{
            // does user own the campground
// if cannot be used as foundCampground.author.id is a mongoose object and req.user._id is a string
            if(foundCampground.author.id.equals(req.user._id)){
               next();
            }else{
                req.flash("error", "You Don't have permission to do that");
               res.redirect("back");
            }
         }
      });   
   }else{
      req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
};
  
middlewareObj.checkCommentOwnership = function(req, res, next){
   //user is logged in
   if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
         if(err){
             req.flash("error", "Comment not found");
            res.redirect("back");
         }else{
            //comment belongs to that user
            if(foundComment.author.id.equals(req.user.id)){
               next();
            }else{
                req.flash("error", "You don't have permission to do that");
               res.redirect("back");
            }
         }
      })
   }else{
       req.flash("error", "You need to be logged in to do that");
      res.redirect("back");
   }
};

middlewareObj.isLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }else{
      req.flash("error", "You need to be logged in to do that")
      res.redirect("/login");
   };
}; 




module.exports = middlewareObj;