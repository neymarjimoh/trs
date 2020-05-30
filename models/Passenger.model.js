const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			trim: true,
			required: true,
		},
		mobile_num: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		is_verified: {
			type: Boolean,
			default: false,
		},
		bookings: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Booking',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Passenger', passengerSchema);
