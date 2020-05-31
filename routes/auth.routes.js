const express = require("express");
const router = express.Router();
const { userSignUp, userSignIn, activateUserAccount } = require("../controllers/auth.controllers");
const { validate, userValidationRules } = require("../middlewares/userValidation");

router.post("/register", userValidationRules(), validate, userSignUp); // register user
router.patch("/verify/:email", activateUserAccount); //verify account before user can login

module.exports = router;