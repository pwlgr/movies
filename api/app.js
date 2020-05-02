const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');
const { Genre, Movie, User } = require('./db/models');

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
		return res.status(200).json({});
	}
	next();
});

// verifyin session middleaware

const verifySession = (req, res, next) => {
	let refreshToken = req.header('x-refresh-token');

	let _id = req.header('_id');

	User.findByIdAndToken(_id, refreshToken)
		.then((user) => {
			if (!user) {
				// user couldn't be found
				return Promise.reject({
					error: 'User not found. Make sure that the refresh token and user id are correct'
				});
			}

			req.user_id = user._id;
			req.userObject = user;
			req.refreshToken = refreshToken;

			let isSessionValid = false;

			user.sessions.forEach((session) => {
				if (session.token === refreshToken) {
					// if the session has expired
					if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
						// refresh token has not expired
						isSessionValid = true;
					}
				}
			});

			if (isSessionValid) {
				next();
			} else {
				return Promise.reject({
					error: 'Refresh token has expired or the session is invalid'
				});
			}
		})
		.catch((e) => {
			res.status(401).send(e);
		});
};

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

app.post('/users', (req, res) => {
	let body = req.body;
	let newUser = new User(body);

	newUser
		.save()
		.then(() => {
			return newUser.createSession();
		})
		.then((refreshToken) => {
			return newUser.generateAccessAuthToken().then((accessToken) => {
				return { accessToken, refreshToken };
			});
		})
		.then((authTokens) => {
			res
				.header('x-refresh-token', authTokens.refreshToken)
				.header('x-access-token', authTokens.accessToken)
				.send(newUser);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

app.post('/users/login', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	User.findByCredentials(email, password)
		.then((user) => {
			return user
				.createSession()
				.then((refreshToken) => {
					return user.generateAccessAuthToken().then((accessToken) => {
						return { accessToken, refreshToken };
					});
				})
				.then((authTokens) => {
					res
						.header('x-refresh-token', authTokens.refreshToken)
						.header('x-access-token', authTokens.accessToken)
						.send(user);
				});
		})
		.catch((e) => {
			res.status(400).send(e);
		});
});

app.get('/users/me/access-token', verifySession, (req, res) => {
	req.userObject
		.generateAccessAuthToken()
		.then((accessToken) => {
			res.header('x-access-token', accessToken).send({ accessToken });
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});

app.listen(3000, () => {
	console.log('Listening on 3000...');
});
