const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: String,
	lastName: String,
	recipes: Array
});
//mongoose data types

UserSchema.methods.validatePassword = function(password){
	return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password){
	return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};