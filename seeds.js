var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Arches national Park",
            image: "https://www.photosforclass.com/download/pixabay-1626412?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe833b3092cf5033ed1584d05fb1d4e97e07ee3d21cac104496f5c278afecb5be_960.jpg&user=skeeze",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget consectetur purus. Cras ac elementum turpis, nec facilisis quam. Phasellus commodo, leo id fringilla ultrices, velit mi laoreet magna, ac aliquam elit justo sed leo. Nunc ornare molestie magna, nec lobortis risus tempor sollicitudin. Morbi quis lorem viverra, sagittis mauris eget, egestas tortor. Donec et purus lorem. Duis ullamcorper risus eget sem malesuada euismod. Donec at sem pulvinar, dignissim lectus et, viverra erat."
        },
        {
            name: "Morro Bay",
            image: "https://www.photosforclass.com/download/flickr-3062207412",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget consectetur purus. Cras ac elementum turpis, nec facilisis quam. Phasellus commodo, leo id fringilla ultrices, velit mi laoreet magna, ac aliquam elit justo sed leo. Nunc ornare molestie magna, nec lobortis risus tempor sollicitudin. Morbi quis lorem viverra, sagittis mauris eget, egestas tortor. Donec et purus lorem. Duis ullamcorper risus eget sem malesuada euismod. Donec at sem pulvinar, dignissim lectus et, viverra erat."
        },
        {
            name: "Darlington Campground",
            image: "https://www.photosforclass.com/download/pixabay-1163419?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2Fe834b70c2cf5083ed1584d05fb1d4e97e07ee3d21cac104496f5c278afecb5be_960.jpg&user=Brahmsee",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget consectetur purus. Cras ac elementum turpis, nec facilisis quam. Phasellus commodo, leo id fringilla ultrices, velit mi laoreet magna, ac aliquam elit justo sed leo. Nunc ornare molestie magna, nec lobortis risus tempor sollicitudin. Morbi quis lorem viverra, sagittis mauris eget, egestas tortor. Donec et purus lorem. Duis ullamcorper risus eget sem malesuada euismod. Donec at sem pulvinar, dignissim lectus et, viverra erat."
        },
    ]
function seedDB(){
    //remove all data
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("All data removed");
        //add few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log("New campground added");
                    //add comments
                    Comment.create({
                        text: "this palce is great but i wish there was a internet",
                        author: "Homes"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            data.comments.push(comment);
                            data.save();
                            console.log("created new comment");
                        }
                    });
                }
            });
        });
    });
    
    
}
module.exports = seedDB;
