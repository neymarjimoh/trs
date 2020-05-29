require('dotenv').config();
module.exports = {
	PORT: process.env.PORT || 4000,
	MONGODBURI: process.env.MONGOURI || 'mongodb://127.0.0.1:27017/trs',
};
