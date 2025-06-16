const mongoose = require("mongoose");
const Listing = require("../model/listing.js");
const sampleListings = require("./data.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderLust');
}

main()
    .then(() => {
        console.log("connected successfully");
        initDB();
    })
    .catch((err) => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    const ownerId = '67d8627516bf1c024d77a2fe'; // Replace with the actual owner ID
    const listingsWithOwner = sampleListings.map(listing => ({
        ...listing,
        owner: ownerId
    }));
    await Listing.insertMany(listingsWithOwner);
    console.log("data insert success");
};