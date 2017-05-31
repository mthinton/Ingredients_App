const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const express = require('express');
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');


const {User} = require('./models');

const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


 passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
)); 
router.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
	res.send('hello world');
})

passport.serializeUser(function (user, done) {
    done(null, user.id);
    //log in, send back to client
});

passport.deserializeUser(function (user, done) {
    User.findById(_id, function (err, user) {
        done(err, user);
    });
});

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
		});
	})
	.then(user => {
		return res.status(201).json(user);
	})
	.catch(err => {
		res.status(500).json({message: 'Internal server error'})
	});
});

router.put('/:id', (req, res) => {
		users.update({
			id: req.params.id,
			recipes: [req.body.title]
		})
		res.status(204).end();
	});

 router.get('/existing',
  passport.authenticate('local', { session: false }),
  function(req, res) {
  	console.log(req.user)
    res.json({ id: req.user.id, username: req.user.username });
  });
	

 router.get('/logout', function(req, res) {
 	console.log('hello world');
	req.session.destroy(function (err) {
		if(err){
			res.send(err);
		}
		res.json({loggedout : true})
  	});
})

module.exports = {router};