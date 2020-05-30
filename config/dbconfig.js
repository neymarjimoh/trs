const mongoose = require('mongoose');
const config = require('./index');

const mongoDbUrl = config.MONGODBURI;

//function that handles the database connection
module.exports = () => {
	mongoose.connect('mongodb://127.0.0.1:27017/trs', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	});

	mongoose.connection.on('connected', function () {
		console.log(
			`Mongoose connection is open... Database connected successfully!`
		);
	});

	mongoose.connection.on('error', function (error) {
		console.log(`Mongoose connection was not successful due to: ${error}`);
	});

	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose default connection is disconnected');
	});
};
