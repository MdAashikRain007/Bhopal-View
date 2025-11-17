const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  checkinDate: {
    type: Date,
    required: true,
  },
  checkoutDate: {
    type: Date,
    required: true,
  },
  guests: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
