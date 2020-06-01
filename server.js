const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config/index');
const mongoDbConnection = require('./config/dbconfig');
const authRoute = require('./routes/auth.routes');
const verifyToken = require('./middlewares/verifyToken');

//load the database
mongoDbConnection();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// prevent all cross site error and all web vulnurabilities
app.use(helmet());

app.get('/', (req, res) => {
	res.send('Server working 🔥');
});

app.get('/api/v1', (req, res) => {
	res.send(` Welcome to the API Version 1.0.0 of TRS 
        Please read the api documentation for how to go about its usage..
    `);
});

app.use(verifyToken);

app.use('/api/v1/auth', authRoute);

// You can set 404 and 500 errors
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	if (error.status === 404)
		res.status(404).json({ message: 'Invalid Request, Request Not found' });
	else {
		console.log(error);
		res.status(500).json({
			message: 'Oops, problem occurred while processing your request..',
		});
	}
});

const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} 🔥`);
});
