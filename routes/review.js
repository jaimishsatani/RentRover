// const express = require("express");
// const router = express.Router({mergeParams: true});
// const wrapasync = require("../utills/wrapAsync.js");
// const ExpressError = require("../utills/ExpressError.js");
// const Review = require("../models/review.js");
// const Listing = require('../models/listing.js');
// const {validatereview,isLoggedin,isReviewAutor} = require("../middleware.js");

// const Reviewcontroller = require("../controllers/review.js");

// // new review
// router.post("/",isLoggedin,validatereview , wrapasync(Reviewcontroller.newReview)); 
 
//  // Delete review
//  router.delete("/:reviewId",isLoggedin,isReviewAutor,wrapasync(Reviewcontroller.deleteReview))

//  module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasync = require("../utills/wrapAsync.js");
const Reviewcontroller = require("../controllers/review.js");
const { validateReview, isLoggedin, isReviewAuthor } = require("../middleware.js");

// Route for creating a new review
router.post("/", isLoggedin, validateReview, wrapasync(Reviewcontroller.newReview));

// Route for deleting a review
router.delete("/:reviewId", isLoggedin, isReviewAuthor, wrapasync(Reviewcontroller.deleteReview));

module.exports = router;


