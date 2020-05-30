const express = require("express");
const router = express.Router();
const { passengerSignUp, passengerSignIn, activatePassengerAccount } = require("../controllers/auth.controllers");
const { validate, userValidationRules } = require("../middlewares/userValidation");

router.post("/passenger/register", userValidationRules(), validate, passengerSignUp); // register passenger
router.patch("/passenger/verify/:email", activatePassengerAccount); //verify account before passenger can login

module.exports = router;