const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	console.log(req.name);
	res.render('index');
};

exports.addStore = (req, res) => {
	// res.send('this works'); // testing
	res.render('editStore', {title: 'add store'});
};

exports.createStore = (req, res) => {
	// console.log(req.body);
	// res.json(req.body);
	const store = new Store(req.body);
};