const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server.js');

const should = chai.should();

chai.use(chaiHttp);

describe('indexpage', function(){
	it('should display hello world', function(){
		return chai.request(app)
		.get('/')
		.then(function(res){
			res.should.have.status(200);
		});
		
	});
});