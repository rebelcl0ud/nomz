const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	res.render('index');
};

exports.addStore = (req, res) => {
	// res.send('this works'); // testing
	res.render('editStore', {title: 'add store'});
};

exports.createStore = async (req, res) => {
	// console.log(req.body);
	// res.json(req.body);

	// es6 promises
	const store = await(new Store(req.body)).save();
	req.flash('success', `${store.name} has been successfully created`);
	res.redirect(`/store/${store.slug}`);
};




