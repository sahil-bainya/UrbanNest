const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedin,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing),
  );

//New Route
router.get("/new", isLoggedin, listingController.renderNewFrom);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .put(
    isLoggedin,
    isOwner,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateListing),
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingController.destroyListing));

// edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditFrom),
);

module.exports = router;
