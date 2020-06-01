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

router.post('/register', userValidationRules(), validate, userSignUp); // register user
router.patch('/verify/:email', activateUserAccount); //verify account before user can login
router.post('/login', userSignInValidationRules(), validate, userSignIn);
router.post('/signout', userSignInValidationRules(), userLogOut);
module.exports = router;
