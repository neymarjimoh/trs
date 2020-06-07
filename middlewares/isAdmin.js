const statusCode = require('http-status');
const routes = require('../constants/routes.constant');
const { ADMIN } = require('../utils/role');

module.exports = (req, res, next) => {
    if (routes.adminOnlyRoutes.includes(req.path)) {
        if (req.user.role !== ADMIN) {
            return res.status(statusCode.PRECONDITION_FAILED).json({
                message: 'Access denied!!! Missing credentials'
            });
        }
        next();
    } else {
        next();
    }
};