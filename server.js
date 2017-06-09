const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {DATABASE_URL} = require('./config');
const session = require('express-session');
const bootstrap = require('bootstrap');

const {router} = require('./Users/authenticationRouter');
const {User} = require('./Users/models');

mongoose.Promise = global.Promise;

mongoose.connect(DATABASE_URL)
//connected using mongoose and used mongoose as schema

const app = express();
//creates actual server. App references server from now on

app.use(morgan('common'));

app.use('/users', router);

app.use(express.static('public'));
//frontend or clientside code

app.listen(process.env.PORT || 8080, () => {
	console.log('Server is up and running!');
});
//Heroku has one server with many websites.

module.exports = {app};