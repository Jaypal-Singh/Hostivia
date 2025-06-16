const Joi = require('joi');
const review = require('./model/review');
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        // Allow image to be optional or any type, since multer puts file in req.file
        image: Joi.any().optional()
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(0).max(5),
        comment : Joi.string().required(),
    }).required(),
});