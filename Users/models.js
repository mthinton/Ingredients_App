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
	savedRecipes: [
	{
		label: {type: String},
		image: {type: String}
	}]
});


UserSchema.methods.validatePassword = function(password){
	console.log(this.password, password);
	return bcrypt.compareSync(password, this.password);
}

UserSchema.statics.hashPassword = function(password){
	return bcrypt.hashSync(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};