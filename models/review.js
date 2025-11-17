const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  create_At: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String,
    required: true // new: indicates which place the review is for
  }
});

module.exports = mongoose.model("Review", reviewSchema);
