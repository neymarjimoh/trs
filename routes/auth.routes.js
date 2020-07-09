const express = require('express');
const router = express.Router();
const {
	userSignUp,
	userSignIn,
	activateUserAccount,
	userLogOut,
	forgetPassword,
	resetPassword,
} = require('../controllers/auth.controllers');
const {
	validate,
	userValidationRules,
	userSignInValidationRules,
} = require('../middlewares/userValidation');

router.post('/register', userValidationRules(), validate, userSignUp);
router.patch('/verify', activateUserAccount);
router.post('/login', userSignInValidationRules(), validate, userSignIn);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:userId', resetPassword);
router.post('/signout', userSignInValidationRules(), userLogOut);
module.exports = router;
