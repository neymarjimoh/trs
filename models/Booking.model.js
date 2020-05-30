const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
		passenger: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Passenger',
		},
		train: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Train',
		},
		from: {
			place: { type: String, required: true },
			date: { type: Date, required: true },
		},
		to: {
			place: { type: String, required: true },
			date: { type: Date },
		},
		train_class: {
			type: String,
			required: true,
		},
		adult: {
			type: Boolean,
			required: true,
		},
		child: {
			type: Boolean,
			required: true,
		},
		ticket_type: {
			type: String,
			required: true,
			enum: ['one-way', 'return'],
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
