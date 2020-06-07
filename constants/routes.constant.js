module.exports = {
	unsecureRoutes: [
		'/', 
		'/api/v1',
		'/api/v1/auth/register',
		'/api/v1/auth/login',
		'/api/v1/auth/verify/:email',
		'api/v1/auth/foget-password',
		'api/v1/auth/reset-password/:userId',
	],
	adminOnlyRoutes: [
		'/api/v1/users',  //only admins can get, delete all users
		'api/v1/trains/new', 
	],
};
