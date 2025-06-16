const Listing = require("../model/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewform = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id)
    .populate({
      path: "review",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!list) {
    req.flash("error", "listing does not exist");
    res.redirect("/listings");
  }
  console.log(list);
  res.render("listings/showList", { list });
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  let geoData = await geocodingClient
    .forwardGeocode({
      query: newListing.location,
      limit: 1,
    })
    .send();
  // console.log(geoData.body.features[0].geometry);
  newListing.geometry = geoData.body.features[0].geometry;

  newListing.owner = req.user._id;

  if (req.file && req.file.path) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  let saved = await newListing.save();
  console.log(saved);
  req.flash("success", "New Listing is created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "listing does not exist");
    res.redirect("/listings");
  }
  res.render("listings/edit", { list });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
  });
  if (req.file && req.file.path) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await updatedListing.save();
  }
  req.flash("success", "edit");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing is delete");
  res.redirect("/listings");
};
