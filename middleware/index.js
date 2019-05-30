var Campground = require("../models/campground");
var Comment = require("../models/comment");

//all the middleware here

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        //if user is logged in then
            
                //if not then redirect
                if(req.isAuthenticated()){
            
                    Campground.findById(req.params.id, function(err, foundCampground){
                        if(err){
                            req.flash("error", "Campground Not Found");
                            res.redirect("back");
                        }
                        else{
                            //does user own the campground?
                            if(foundCampground.author.id.equals(req.user._id)){
                                next();
                            }else{
                                req.flash("error", "You Don't Have Permission");
                                res.redirect("back");
                            }
                        }
                    });
                }
                //else redirect 
                else {
                    req.flash("error", "You Need To Be Logged In To Do That");
                    res.redirect("back");
                }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
        //if user is logged in then
            
                //if not then redirect
                if(req.isAuthenticated()){
            
                    Comment.findById(req.params.comment_id, function(err, foundComment){
                        if(err || !foundComment){
                            req.flash("error", "Comment not found");
                            res.redirect("back");
                        }
                        else{
                            //does user own the comment?
                            if(foundComment.author.id.equals(req.user._id)){
                                next();
                            }else{
                                req.flash("error", "You Don't Have Permission");
                                res.redirect("back");
                            }
                        }
                    });
                }
                //else redirect 
                else {
                    req.flash("error", "You Need To Be Logged In To Do That");
                    res.redirect("back");
                }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You Need To Be Logged In To Do That");
    res.redirect("/login");
}



module.exports = middlewareObj