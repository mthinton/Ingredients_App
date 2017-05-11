const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {DATABASE_URL} = require('./config');

const {router} = require('./Users/router');

mongoose.Promise = global.Promise;

mongoose.connect(DATABASE_URL)
//connected using mongoose and used mongoose as schema

const app = express();

app.use(morgan('common'));

app.use('/users', router);

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.status(200).json({message: 'hello world'});
})

app.get('/welcomescreen', (req, res) => {
	res.status(200).json({message: 'hello world'});
})

app.get('/searchscreen', (req, res) =>{
	res.status(200).json({message: 'All the food, all the time'});
})

app.listen(process.env.PORT || 8080, () => {
	console.log('Server is up and running!');
});

module.exports = {app};