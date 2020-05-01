const { Genre } = require('./genre.model');
const { Movie } = require('./movie.model');
const { User } = require('./user.model');

console.log('this comes from genre', Genre);

module.exports = {
	Genre,
	Movie,
	User
};
