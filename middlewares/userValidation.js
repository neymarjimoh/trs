const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
	return [
		body('email')
			.not()
			.isEmpty()
			.isEmail()
			.withMessage('Enter a valid email')
			.normalizeEmail(),
		body('fullname')
			.isLength({ min: 8, max: 50 })
			.withMessage('Full name must between at least 8 characters long'),
		body('password')
			.not()
			.isEmpty()
			.isLength({ min: 8 })
			.withMessage('Password must have at least 8 characters'),
		body('mobile_num')
			.isLength({ min: 10, max: 15 })
			.withMessage('Mobile Number must between 10 to 15 characters long')
			.matches(/^[+-\d]+$/)
			.withMessage('Mobile Number must be a valid Nigerian number'),
		body('address').not().isEmpty().withMessage('Enter a valid address'),
	];
};
const userSignInValidationRules = () => {
	return [
		body('email')
			.not()
			.isEmpty()
			.isEmail()
			.withMessage('Enter a valid email')
			.normalizeEmail(),
		body('password')
			.not()
			.isEmpty()
			.isLength({ min: 8 })
			.withMessage('Password must have at least 8 characters'),
	];
};

//train input validation
const trainValidationRules = () => {
	return [
		body('capacity.first_class')
			.notEmpty()
			.isInt()
			.withMessage(`Enter valid number for first class field`),
		body('capacity.second_class')
			.notEmpty()
			.isInt()
			.withMessage(`Enter valid number for second class field`),
		body('origin').notEmpty().withMessage('origin field must not be empty'),
		body('destination')
			.notEmpty()
			.withMessage('destination field must not be empty'),
	];
};

const trainUpdateValidationRules = () => {
	return [
		body('capacity.first_class')
			.optional()
			.isInt()
			.withMessage('Enter a valid number for first class field'),
		body('capacity.second_class')
			.optional()
			.isInt()
			.withMessage('Enter a valid number for second class field'),
		body('origin')
			.optional()
			.isString()
			.withMessage('origin field must be a string'),
		body('destination')
			.optional()
			.isString()
			.withMessage('destination field must be a string'),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors = [];
	errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors,
	});
};

module.exports = {
	userValidationRules,
	userSignInValidationRules,
	trainValidationRules,
	trainUpdateValidationRules,
	validate,
};
