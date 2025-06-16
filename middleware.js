const Listing = require("./model/listing");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be loggined");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next) =>{
    let { id } = req.params;
    let list = await Listing.findById(id);
    if(!list.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you Have Not a permision to Edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}