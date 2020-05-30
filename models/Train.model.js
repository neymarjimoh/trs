const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema(
	{
		train_number: {
			type: String,
			required: true,
			unique: true,
		},
		capacity: {
			first_class: { type: Number, required: true },
			second_class: { type: Number, required: true },
		},
		origin: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},

		available: {
			type: Boolean,
			default: true,
		},
		passengers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Passenger',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Train', trainSchema);
