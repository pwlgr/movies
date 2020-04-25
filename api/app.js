const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');
const { Genre, Movie } = require('./db/models');

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

app.get('/genres', (req, res) => {
	Genre.find({})
		.then((genres) => {
			res.send(genres);
		})
		.catch((e) => {
			res.send(e);
		});
});

app.post('/genres', (req, res) => {
	let title = req.body.title;
	let newGenre = new Genre({
		title
	});
	newGenre.save().then((genreDoc) => {
		res.send(genreDoc);
	});
});

app.patch('/genres/:id', (req, res) => {
	Genre.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: req.body
		}
	).then(() => {
		res.sendStatus(200);
	});
});

app.delete('/genres/:id', (req, res) => {
	Genre.findOneAndRemove({
		_id: req.params.id
	}).then((removeListDoc) => {
		res.send(removeListDoc);
	});
});

app.get('/genres/:genreId/movies', (req, res) => {
	Movie.find({ _genreId: req.params.genreId }).then((movies) => {
		res.send(movies);
	});
});

app.post('/genres/:genreId/movies', (req, res) => {
	let newMovie = new Movie({
		title: req.body.title,
		_genreId: req.params.genreId
	});
	newMovie.save().then((newMovieDoc) => {
		res.send(newMovieDoc);
	});
});

app.patch('/genres/:genreId/movies/:movieId', (req, res) => {
	Movie.findOneAndUpdate(
		{
			_id: req.params.movieId,
			_genreId: req.params.genreId
		},
		{
			$set: req.body
		}
	).then(() => {
		res.send(200);
	});
});

app.delete('/genres/:genreId/movies/:movieId', (req, res) => {
	Movie.findOneAndRemove({
		_id: req.params.movieId,
		_genreId: req.params.genreId
	}).then((removeMovieDoc) => {
		res.send(removeMovieDoc);
	});
});

app.listen(3000, () => {
	console.log('Listening on 3000...');
});
