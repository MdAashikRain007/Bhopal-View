const express = require("express");
const router = express.Router();
const reviews = require("../controller/review.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

router.get("/:place", reviews.showPlace);
router.post("/:place/review", isLoggedIn, reviews.createReview);
router.delete("/:place/review/:id", isLoggedIn, isReviewAuthor, reviews.deleteReview);
router.get("/:place/review/:id/edit", isLoggedIn, isReviewAuthor, reviews.renderEditForm);
router.put("/:place/review/:id", isLoggedIn, isReviewAuthor, reviews.updateReview);

module.exports = router;
