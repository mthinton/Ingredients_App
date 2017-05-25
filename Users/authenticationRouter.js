const {BasicStrategy} = require('passport-http');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const express = require('express');


const {User} = require('./models');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const basicStrategy = new BasicStrategy(function(username, password, callback){
	let user;
	User.findOne({username: username})
	.exec()
	.then(_user => {
		user = _user;
		if(!user){
			return callback(null, false, {message: 'Incorrect username'});
		}
		return user.validatePassword(password);
	})
	.then(isValid => {
		if(!isValid){
			return callback(null, false, {message: 'Incorrect password'});
		}
		else {
			return callback(null, user)
		}
	});
});

router.use(passport.initialize());
router.use(passport.session());
passport.use(basicStrategy);


router.post('/', (req, res) => {

	let {username, password, firstName, lastName} = req.body;//those 4 properties being picked out from req.body from AJAX request

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
		return res.status(201).json(user.apiRepr());
	})
	.catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

router.post('/cars', (req, res) => {
	const newUser = new User()

	newUser.firstName = 'Bmw'
	newUser.lastName = 2017

	newUser.save((err, record) => {
			if(err){
				res.send(err)
			}
			res.json(record)
	})
})

router.get('/',
		passport.authenticate('basic', {session: false}),
		(req, res) => res.json({user: req.user})
);
	

router.get('/logout', function(req, res){
	req.session.destroy(function(err){
		if(err){
			console.log('error: ', err);
		}else{
			console.log('req.session: ', req.user)
			req.logout();
			res.redirect('/');
		}
	});
});

module.exports = {router};