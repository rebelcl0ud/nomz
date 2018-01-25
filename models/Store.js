const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Oops! Seems you forgot a store name, please enter one.'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String],
	created: {
		type: Date, 
		default: Date.now
	},
	location: {
		// location TYPE
		type: {
			type: String, 
			default: 'Point'
		},
		// location coordinates
		coordinates: [{
			type: Number, 
			required: 'you must supply coordinates'
		}],
		// location address
		address: {
			type: String,
			required: 'you must supply an address'
		}
	} 
});

// will be coming back to this-- presently 2 stores w/ same name would have overlap slugs (no bueno)
storeSchema.pre('save', function(next) {
	if(!this.isModified('name')) {
		next(); // skips
		return; // stops function
	}
	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Store', storeSchema);