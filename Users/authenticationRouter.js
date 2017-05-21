const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser');
const passport = require('passport');

const {User} = require('./models');

const router = express.Router();

router.use(jsonParser.urlencoded({ extended: true }));
router.use(jsonParser.json());

const basicStrategy = new BasicStrategy((username, password, callback) => {
	let user;
	User
	.findOne({username: username})
	.exec()
	.then(_user => {
		user = _user;
		if(!user){
			return callback(null, false, {message: 'Incorrect username'});
		}
		return user.validatePassword(password);
	})
	.then(isValid => {
		if(!isValid) {
		return callback(null, false, {message: 'Incorrect password'});
		}
		else{
			return callback(null, user)
		}	
	});
});

passport.use(basicStrategy);
router.use(passport.initialize());

router.post('/', (req, res) => {

console.log(req.body);
let {username, password, firstName, lastName} = req.body;

return User
.find({username})
.count()
.exec()
.then(count => {
	if(count > 0){
		return res.status(422).json({message: 'username already taken'});
	}
	return User.hashPassword(password)
})
	.then(hash => {
		return User
		.create({
			username: username,
			password: hash,
			firstName: firstName,
			lastName: lastName
		})
	})
	.then(user => {
		console.log(user);
		return res.status(201).json(user.apiRepr());
	})
	.catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

router.get('/', passport.authenticate('basic',  {session: false}), (req, res) => 
	res.json({user: req.user.apiRepr()})
	);

module.exports = {router};