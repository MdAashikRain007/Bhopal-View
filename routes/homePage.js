const express=require("express");
const router=express.Router();
const homePageController=require("../controller/homePage.js");

router.get("/",homePageController.homePage);

module.exports=router;