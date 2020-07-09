const router = require('express').Router();
const {
	addNewTrain,
	getAllTrains,
	getTrainByNumber,
	getAllTrainsByFilter,
	updateTrain,
} = require('../controllers/train.controllers');

const {
	validate,
	trainValidationRules,
	trainUpdateValidationRules,
} = require('../middlewares/userValidation');

// add a new train
router.post('/new', trainValidationRules(), validate, addNewTrain);

//get all train
router.get('/trains', getAllTrains);

//get specific train
router.get('/:trainnumber', getTrainByNumber);

//filter trains based on capacity, origin, destination, and being available
router.get('/trains/filter', getAllTrainsByFilter);

//update train information
router.put(
	'/update/:trainnumber',
	trainUpdateValidationRules(),
	validate,
	updateTrain
);

module.exports = router;
