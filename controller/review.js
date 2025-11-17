const Review = require("../models/review");
const User = require("../models/user");

module.exports.showPlace = async (req, res) => {
    const { place } = req.params;
    const reviews = await Review.find({ location: place }).populate("author");
    res.render(`./page/${place}.ejs`, { reviews, place });
};

module.exports.createReview = async (req, res, next) => {
    const { place } = req.params;
    const { comment, rating } = req.body;
    const review = new Review({ comment, rating, location: place, author: req.user._id });
    await review.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { reviews: review._id } });
    req.flash("success", "Review added!");
    res.redirect(`/bhopal/${place}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, place } = req.params;
    await Review.findByIdAndDelete(id);
    req.flash("success", "Review deleted successfully.");
    res.redirect(`/bhopal/${place}`);
};

module.exports.renderEditForm = async (req, res) => {
    const { id, place } = req.params;
    const review = await Review.findById(id);
    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/bhopal/${place}`);
    }
    res.render("editreview.ejs", { review, place });
};

module.exports.updateReview = async (req, res) => {
    const { id, place } = req.params;
    const { comment, rating } = req.body;
    await Review.findByIdAndUpdate(id, { comment, rating });
    req.flash("success", "Review updated successfully.");
    res.redirect(`/bhopal/${place}`);
};
