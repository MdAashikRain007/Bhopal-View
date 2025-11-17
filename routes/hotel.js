const express = require("express");
const router = express.Router();
const hotel = require("../controller/hotel.js");
const { isLoggedIn } = require("../middleware");

router.get("/", isLoggedIn, hotel.renderHotelForm);
router.post("/book", isLoggedIn, hotel.bookHotel);

module.exports = router;
