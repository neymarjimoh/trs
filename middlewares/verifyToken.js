const statusCode = require('http-status');
const config = require('../config');
const jwt = require('jsonwebtoken');
const routes = require('../constants/routes.constant');

module.exports = (req, res, next) => {
	//check if the token is needed for the route being accessed
	if (!routes.unsecureRoutes.includes(req.path)) {
		const authHeader = req.headers['authorization'];
		let token;

		if (!authHeader) {
			return res.status(statusCode.PRECONDITION_FAILED).json({
				message:
					'Access denied!!! Missing credentials... try to sign in or sign up',
			});
		}

		//separate the Bearer from the string if it exists
		const separateBearer = authHeader.split(' ');
		if (separateBearer.includes('Bearer')) {
			token = separateBearer[1];
		} else {
			token = authHeader;
		}

		try {
			const grantAccess = jwt.verify(token, config.SECRET_KEY);
			req.user = grantAccess;
			next();
			return;
		} catch (error) {
			console.log('Error from token verification >>>>> ', error);
			res.status(statusCode.FORBIDDEN).json({
				message: 'Something went wrong. Please try again..',
			});
		}
	} else {
		next();
	}
};
