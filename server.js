const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.status(200).json({message: 'hello world'});
})

app.listen(process.env.PORT || 8080);

module.exports = {app};