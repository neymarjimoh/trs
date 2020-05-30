const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
	{
		ticket_type: {
			type: String,
			enum: ['one-way', 'return'],
		},
		ticket_number: {
			type: String,
			unique: true,
		},
		valid_payment: {
			type: Boolean,
			default: false,
		},
		booking: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Booking',
		},
		train: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Train',
		},
		passenger: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Passenger',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);
