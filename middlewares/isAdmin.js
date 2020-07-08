const statusCode = require('http-status');
const routes = require('../constants/routes.constant');
const {ADMIN} = require('../utils/role');
const {User} = require('../models/index');

module.exports = async (req, res, next) => {
	if (req.user) {
		if (routes.adminOnlyRoutes.includes(req.path)) {
			const user = req.user.userId;
			try {
				const adminCheck = await User.findOne({_id: user});

				if (adminCheck.role !== ADMIN) {
					return res.status(statusCode.UNAUTHORIZED).json({
						message: 'Access denied!!! .. You are not an admin',
					});
				} else {
					next();
					return;
				}
			} catch (error) {
				console.log(`error in approving authorization >>> ${error.message}`);
				return res.status(statusCode.SERVICE_UNAVAILABLE).json({
					message: 'An error occured... Try again later',
				});
			}
		} else {
			next();
		}
	} else {
		next();
	}
};
// if (routes.adminOnlyRoutes.includes(req.path)) {
//     const user = req.user.userId;
//     try {
//         const adminCheck = await User.find({_id: user});

//         if (adminCheck.role !== ADMIN) {
//             return res.status(statusCode.PRECONDITION_FAILED).json({
//                 message: 'Access denied!!! Missing credentials',
//             });
//         } else {
//             next();
//             console.log(user);
//             return;
//         }
//     } catch (error) {
//         console.log(`error in approving authorization >>> ${error.message}`);
//         return res.status(statusCode.SERVICE_UNAVAILABLE).json({
//             message: 'An error occured... Try again later',
//         });
//     }
// } else {
//     next();
