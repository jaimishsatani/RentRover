const express = require("express");
const router = express.Router();
const wrapasync = require("../utills/wrapAsync.js");
const Listing = require('../models/listing.js');
const {isLoggedin,isOwner,validatelisting} = require("../middleware.js");
const path = require("path");
const multer  = require('multer');
const {storage} = require("../CloudConfig.js")
const upload = multer({ storage });

const listingcontroller = require("../controllers/listing.js");

router.route('/').get(wrapasync(listingcontroller.index)).
post(isLoggedin,upload.single("listing[image]"),wrapasync(listingcontroller.createListing)
);



// new route
router.get('/new',isLoggedin,listingcontroller.newListing);

router.route('/:id').get(wrapasync(listingcontroller.showListing)).put(isLoggedin,isOwner,upload.single("listing[image]"),wrapasync(listingcontroller.updateListing)).get(wrapasync(listingcontroller.showListing)).delete(isLoggedin,isOwner,wrapasync(listingcontroller.deleteListing));
  
// Edit route
router.get('/:id/edit',isLoggedin,isOwner,wrapasync(listingcontroller.EditLisitng));

module.exports = router;