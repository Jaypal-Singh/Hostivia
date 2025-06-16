const express = require("express");
const app = express();
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/expressError.js");
const review = require("../model/review");
const router = express.Router({ mergeParams: true }); // ✅
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const {reviewSchema} = require("../Schema.js")
const reviewController = require("../Controller/review.js");


const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
   }else{
    next();
   }
}

//Review add
router.post("/", reviewController.createReview)

//review delete
router.delete("/:reviewId", wrapAsync(reviewController.deleteReview));

module.exports = router;