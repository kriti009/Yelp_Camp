var mongoose = require("mongoose");
//Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
      id:{
         type : mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
         {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "Comment"
         }
      ]
});
var Campground = mongoose.model("Campground", campgroundSchema);
// below line use to return value
module.exports = Campground;