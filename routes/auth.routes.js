const express = require('express');
const router = express.Router();
const {
	userSignUp,
	userSignIn,
	activateUserAccount,
	userLogOut,
} = require('../controllers/auth.controllers');
const {
	validate,
	userValidationRules,
	userSignInValidationRules,
} = require('../middlewares/userValidation');

<<<<<<< HEAD
router.post("/register", userValidationRules(), validate, userSignUp); // register user
router.patch("/verify/:email", activateUserAccount); //verify account before you can login
router.post("/login", )

module.exports = router;
=======
router.post('/register', userValidationRules(), validate, userSignUp); // register user
router.patch('/verify/:email', activateUserAccount); //verify account before user can login
router.post('/login', userSignInValidationRules(), validate, userSignIn);
router.post('/signout', userSignInValidationRules(), userLogOut);
module.exports = router;
>>>>>>> bc79075eace7ed711d14cf0f988a978ccd097de0
