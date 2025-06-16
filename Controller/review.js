const Review = require("../model/review.js");
const Listing = require("../model/listing.js");

module.exports.createReview =  async(req,res) =>{
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    listing.review.push(newReview._id);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async(req,res) => {
    const { id , reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}});

    res.redirect(`/listings/${id}`);
}