const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = { Genre };
