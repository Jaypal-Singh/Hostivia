const mongoose = require("mongoose");
const Review = require("./review.js");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: {
            type: String,
            default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
        },
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    review : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,  
        ref: "User",                  
    },
    geometry : {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
    

listingSchema.post("findOneAndDelete", async (listing)=> {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;