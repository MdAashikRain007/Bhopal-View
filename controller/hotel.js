const Booking = require("../models/hotel");

module.exports.renderHotelForm = (req, res) => {
    res.render("hotel.ejs");
};

module.exports.bookHotel = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        newBooking.user = req.user._id;
        await newBooking.save();
        req.flash("success", "Booking submitted!");
        res.redirect("/");
    } catch (err) {
        req.flash("error", "There was an error processing your booking.");
        res.redirect("/hotel");
    }
};
