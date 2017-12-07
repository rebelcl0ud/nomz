const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
	res.render('index');
};

exports.addStore = (req, res) => {
	// res.send('this works'); // testing
	res.render('editStore', { title: 'add store' });
};

exports.createStore = async (req, res) => {
	// console.log(req.body);
	// res.json(req.body);

	// es6 promises
	const store = await(new Store(req.body)).save();
	req.flash('success', `${store.name} has been successfully created. Leave a review?`);
	res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
	// 1. query db for list of all stores
	const stores = await Store.find();
	// console.log(stores);
	res.render('stores', { title: 'Stores', stores: stores });
};

exports.editStore = async (req, res) => {
	// 1. find store given id
	// res.json(req.params);
	const store = await Store.findOne({ _id: req.params.id });
	// 2. confirm user, owner of store TODO
	// 3. render edit form so user can update store
	res.render('editStore', { title: `Edit ${store.name}`, store: store })
}

exports.updateStore = async (req, res) => {
	// 1. find/update store
	// redirect store and show it worked
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, // return new store instead of old one
		runValidators: true
	}).exec();
	req.flash('success', `Successfully updated ${store.name} <a href="/stores/${store.slug}"> View Store </a>`);
	res.redirect(`/stores/${store.id}/edit`);
}


