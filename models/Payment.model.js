const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
	{
		amount: {
			type: String,
			required: true,
		},
		payment_mode: {
			type: String,
			required: true,
		},
		ticket: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Ticket',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
