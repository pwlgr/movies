const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');
const { Genre, Movie } = require('./db/models');

app.use(bodyParser.json());

app.get('/genres', (req, res) => {
	Genre.find({}).then((genres) => {
		res.send(genres);
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

app.patch('/genres/:id', (req, res) => {});

app.delete('/genres/:id', (req, res) => {});

app.listen(3000, () => {
	console.log('Listening on 3000...');
});
