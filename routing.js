const express = require("express");
const router = express.Router();


const UserRoute = require("./routes/user_route");


router.use("/user", UserRoute);



module.exports = router;