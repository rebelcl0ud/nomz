const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer = require('multer'); // image upload- where + what is allowed
const jimp = require('jimp'); // resizes photo
const uuid = require('uuid'); // gives unique identifers

const multerOptions = {
	// multer will handle upload req, where and what is allowed
	// doesnt store to disk, but on mem of server, tmp [below]
	storage: multer.memoryStorage(),
	// below uses es6, same as => fileFilter: function(req, file, next)
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if(isPhoto) {
			next(null, true);
		} else {
			next({message: 'filetype not allowed'}, false);
		}
	}
};

exports.homePage = (req, res) => {
	res.render('index');
};

exports.addStore = (req, res) => {
	// res.send('this works'); // testing
	res.render('editStore', { title: 'add store' });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async(req, res, next) => {
	// check if there is no new file to resize
	if(!reg.file) {
		next(); // skip to next middleware
		return;
	}
	console.log(req.file);
}

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
	// set location data to be a point (googleAPI)
	req.body.location.type = 'Point';
	// 1. find/update store
	// redirect store and show it worked
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, // return new store instead of old one
		runValidators: true
	}).exec();
	req.flash('success', `Successfully updated ${store.name} <a href="/stores/${store.slug}"> View Store </a>`);
	res.redirect(`/stores/${store.id}/edit`);
}


