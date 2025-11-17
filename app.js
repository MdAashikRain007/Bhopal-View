if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}
const express=require("express");
const app=express();
const ejsMate=require("ejs-mate");
const methodOverride =require("method-override");
const path=require("path");
const mongoose = require('mongoose');
const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");
const flash = require('connect-flash');
const session = require('express-session')
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require('connect-mongo');



// Routes
const homePageRoute = require("./routes/homePage.js");
const authRoutes = require("./routes/user.js");
const reviewRoutes = require("./routes/review.js");
const hotelRoutes = require("./routes/hotel.js");

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store= MongoStore.create({
    mongoUrl:process.env.ATLASDB_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,

});

store.on("error",()=>{
    console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions= {
    // store,
 secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expire:Date.now() +7*24*60*60*100,
    maxAge:7*24*60*60*100,
    httpOnly:true
}
}
app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})


main().then((res)=>{
    console.log(res);
}).catch(err => console.log(err));

async function main() {
    const dbURL = process.env.ATLASDB_URL;
    if (!dbURL) {
        throw new Error("ATLASDB_URL is not defined in .env file");
    }
    await mongoose.connect(dbURL);
  }


// app.use("/",homePageRoute);
app.use("/", homePageRoute);
app.use("/bhopal", authRoutes);
app.use("/bhopal", reviewRoutes);
app.use("/hotel", hotelRoutes);




app.all(/.*/,(req,res,next)=>{
next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
})

app.listen("8080",(req,res)=>{
    console.log("Sever is listenig on port 8080");
})

