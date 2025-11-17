// module.exports.isLoggedIn=(req,res,next)=>{
//     if(!req.isAuthenticated()){
//         req.session.redirectUrl=req.originalUrl;
//         req.flash("error","You must be logged in to create listing!");
//          return res.redirect("/login");
//       }
//       next();
// };
// in middleware.js
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Store the URL they were trying to access
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to post a review!");
    // Redirect to your login form route
    return res.redirect("/bhopal/loginform");
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    req.flash('error', 'Review not found.');
    return res.redirect(`/bhopal/${req.params.place}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that.');
    return res.redirect(`/bhopal/${req.params.place}`);
  }

  next();
};
