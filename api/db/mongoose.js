const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
	.connect('mongodb://localhost:27017/MovieManager', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to MongoDB.');
	})
	.catch((err) => {
		console.log('Error', err);
	});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
module.exports = {
	mongoose
};
