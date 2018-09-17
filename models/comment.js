var mongoose = require("mongoose");
//Schema Setup
var commentSchema = new mongoose.Schema({
   text: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String 
   },
});
var Comment = mongoose.model("Comment", commentSchema);
// below line use to return value
module.exports = Comment;