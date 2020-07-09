const { User, Train } = require('../models/index');
const statusCode = require('http-status');
const { USER, ADMIN } = require('../utils/role');

//add new train
exports.addNewTrain = async (req, res) => {
	let { capacity, origin, destination } = req.body;
	try {
		//generate the train number by looking at the last entry made to the collection
		const lastEntry = await Train.findOne().sort({ $natural: -1 }).limit(1);
		let trainNumber;
		if (lastEntry) {
			trainNumber = `TRS${parseInt(lastEntry.train_number.substring(3)) + 1}`;
		} else {
			trainNumber = 'TRS600'; //started with 600, any number could be used
		}

		origin = origin.charAt(0).toUpperCase() + origin.slice(1);
		destination = destination.charAt(0).toUpperCase() + destination.slice(1);

		const train = new Train({
			capacity,
			origin,
			destination,
			train_number: trainNumber,
		});

		const savedTrain = await train.save();

		res.status(statusCode.CREATED).json({
			message: 'New train has been added',
			train_number: savedTrain.train_number,
		});
	} catch (error) {
		console.log(`error in saving train >>> ${error.message}`);
		res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message:
				'An error occured while processing your request.. try again later',
		});
	}
};

//get all train
exports.getAllTrains = async (req, res) => {
	const user = req.user.userId;

	try {
		const verifyUser = await User.findOne({ _id: user });

		let allTrains;

		//verify the role of the user
		if (verifyUser.role === ADMIN) {
			allTrains = await Train.find()
				.populate('passengers', 'fullname mobile_num email')
				.select('-__v ');
		} else {
			allTrains = await Train.find().select(
				'-__v -_id -passengers -createdAt -updatedAt'
			);
		}

		return res.status(statusCode.OK).json({
			message: 'All trains!!!',
			data: allTrains,
		});
	} catch (error) {
		console.log(`error in retrieving all trains >>> ${error.message}`);
		res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message:
				'An error occured while processing your request.. try again later',
		});
	}
};

//get specific train
exports.getTrainByNumber = async (req, res) => {
	try {
		const user = req.user.userId;
		const verifyUser = await User.findOne({ _id: user });
		const trainNumber = req.params.trainnumber;

		let train;

		//verify the role of the user to know the kind of information to be displayed
		if (verifyUser.role === ADMIN) {
			train = await Train.findOne({ train_number: trainNumber })
				.populate('passengers', 'fullname mobile_num email')
				.select('-__v ');
		} else {
			train = await Train.findOne({ train_number: trainNumber }).select(
				'-__v -_id -passengers -createdAt -updatedAt'
			);
		}

		return res.status(statusCode.OK).json({
			message: 'Found train',
			data: train,
		});
	} catch (error) {
		console.log(`error in retrieving the train required >>> ${error.message}`);
		res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message:
				'An error occured while processing your request.. try again later',
		});
	}
};

//get trains based on filter set
exports.getAllTrainsByFilter = async (req, res) => {
	let { capacity, from, to, available } = req.query;
	try {
		const user = req.user.userId;
		const verifyUser = await User.findOne({ _id: user });

		let trains;

		//operation based on each set
		if (capacity || from || to || available) {
			if (verifyUser.role === ADMIN) {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
						{
							origin: from
								? from.charAt(0).toUpperCase() + from.slice(1)
								: null,
							destination: to ? to.charAt(0).toUpperCase() + to.slice(1) : null,
						},
						{ available },
					],
				})
					.populate('passengers', 'fullname mobile_num email')
					.select('-__v ');
			} else {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
						{
							origin: from
								? from.charAt(0).toUpperCase() + from.slice(1)
								: null,
							destination: to ? to.charAt(0).toUpperCase() + to.slice(1) : null,
						},
						{ available },
					],
				}).select('-__v -_id -passengers -createdAt -updatedAt');
			}
		}

		//operation based on origin and destination with capacity
		if (capacity && from && to) {
			//transform input to match db data
			from = from.charAt(0).toUpperCase() + from.slice(1);
			to = to.charAt(0).toUpperCase() + to.slice(1);

			if (verifyUser === ADMIN) {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
					],
					origin: from,
					destination: to,
				})
					.populate('passengers', 'fullname mobile_num email')
					.select('-__v ');
			} else {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
					],
					origin: from,
					destination: to,
				}).select('-__v -_id -passengers -createdAt -updatedAt');
			}
		}

		//operation based on being available, origin and destination
		if (available && from && to) {
			//transform input to match db data
			from = from.charAt(0).toUpperCase() + from.slice(1);
			to = to.charAt(0).toUpperCase() + to.slice(1);

			if (verifyUser === ADMIN) {
				trains = await Train.find({
					origin: from,
					destination: to,
					available,
				})
					.populate('passengers', 'fullname mobile_num, email')
					.select('-__v ');
			} else {
				trains = await Train.find({
					origin: from,
					destination: to,
					available,
				}).select('-__v -_id -passengers -createdAt -updatedAt');
			}
		}

		//operation based on capacity and available
		if (capacity && available) {
			if (verifyUser === ADMIN) {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
					],
					available,
				})
					.populate('passengers', 'fullname mobile_num email')
					.select('-__v ');
			} else {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
					],
					available,
				}).select('-__v -_id -passengers -createdAt -updatedAt');
			}
		}

		//filter based on the three parameters
		if (capacity && from && to && available) {
			//transform input to match db data
			from = from.charAt(0).toUpperCase() + from.slice(1);
			to = to.charAt(0).toUpperCase() + to.slice(1);

			if (verifyUser === ADMIN) {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
					],
					origin: from,
					destination: to,
					available,
				})
					.populate('passengers', 'fullname mobile_num, email')
					.select('-__v ');
			} else {
				trains = await Train.find({
					$or: [
						{ 'capacity.first_class': capacity },
						{ 'capacity.second_class': capacity },
					],
					origin: from,
					destination: to,
					available,
				}).select('-__v -_id -passengers -createdAt -updatedAt');
			}
		}

		//if it returns an empty array, send a message to the user
		if (trains.length <= 0) {
			return res.status(statusCode.NOT_FOUND).json({
				message: 'No train match the filter set... try to be specific',
			});
		}

		//success messsage and trains found
		return res.status(statusCode.OK).json({
			message: 'Found trains!!!',
			data: trains,
		});
	} catch (error) {
		console.log(`error in retrieving the train required >>> ${error.message}`);
		res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message:
				'An error occured while processing your request.. try again later',
		});
	}
};

//update train information
exports.updateTrain = async (req, res) => {
	const user = req.user.userId;
	const trainNumber = req.params.trainnumber;

	try {
		const adminCheck = await User.findOne({ _id: user });

		//confirm if it is admin
		if (adminCheck.role !== ADMIN) {
			return res.status(statusCode.UNAUTHORIZED).json({
				message: 'Access denied!!! .. You are not an admin',
			});
		}

		const updatedTrain = await Train.findOneAndUpdate(
			{ train_number: trainNumber },
			req.body,
			{ new: true }
		).select('-__v');

		//if no update was made
		if (Object.keys(req.body).length === 0) {
			return res.status(statusCode.PRECONDITION_REQUIRED).json({
				message:
					"Are you sure you don't want to update any information? You might want to check the req.body",
			});
		}

		if (!updatedTrain) {
			return res.status(statusCode.NOT_FOUND).json({
				message: 'Train was not found... Enter a valid train number',
			});
		} else {
			return res.status(statusCode.OK).json({
				message: 'Train updated successfully',
				new_data: updatedTrain,
			});
		}
	} catch (error) {
		console.log(`error in updating the train required >>> ${error.message}`);
		res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message:
				'An error occured while processing your request.. try again later',
		});
	}
};
