const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	_movieId: {
		type: mongoose.Types.ObjectId,
		required: true
	}
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Movie };
