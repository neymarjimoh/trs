const mongoose = require('mongoose');
const { Schema } = mongoose;
const { USER } = require('../utils/role');

const userSchema = new Schema(
	{
		fullname: {
			type: String,
			trim: true,
			required: true
		},
		mobile_num: {
			type: String,
			trim: true,
			required: true
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		address: {
			type: String,
			trim: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		is_verified: {
			type: Boolean,
			default: false
		},
		role: {
			type: String,
			default: USER
		},
		bookings: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Booking'
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
