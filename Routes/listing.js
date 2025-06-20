const express = require("express")
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/expressError.js");
const {listingSchema} = require("../Schema.js")
const {isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../Controller/listing.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage});



const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
   }else{
    next();
   }
}

router
    .route("/")
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing))
    .get(wrapAsync(listingController.index));
  
    
//new route
router.get("/new", isLoggedIn, listingController.renderNewform);


router.route("/:id")
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))
    .get(wrapAsync(listingController.showListing));

// edite list
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;