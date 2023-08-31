require("dotenv").config();
const express = require("express");
//const bcrypt = require("bcryptjs");
// const checkNumber = require("../helper/checkNumber");
// const jwt = require("jsonwebtoken");
// const isAuthenticate = require("../middleware/authcheck");
// const generateAccessToken = require("../helper/generateAccessToken");
const User = require("../models/user");
//const FriendRequest = require("../models/friend_request");
const UserRoute = express.Router();

/**
 * This method is used to get list of all user
 */

UserRoute.get("/list", async(req,res)=>{
    try{
        let UserData = await User.find({}).sort({_id:-1});

        message = {
            error:false,
            message:"All User list",
            data:UserData
        };
        res.status(200).send(message);
    }catch(err){
        message = {
            error:true,
            message:"Operation Failed",
            data:err.toString()
        };
        res.status(200).send(message);
    }
});

module.exports = UserRoute
