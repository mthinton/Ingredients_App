const express = require('express');
const app = express();

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

app.get('/searchresults', (req,res) => {
	res.status(200).json({message: 'Was this what you were looking for?'});
})

app.listen(process.env.PORT || 8080);

module.exports = {app};