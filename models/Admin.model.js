const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
	{
		fullname: {
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
		password: {
			type: String,
			required: true,
		},
		is_verified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
