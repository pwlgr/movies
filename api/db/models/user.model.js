const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const jwtSecret = '97353273838983877901dsfasdadfeerdvv1871021193';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	sessions: [
		{
			token: {
				type: String,
				required: true
			},
			expiredAt: {
				type: Number,
				required: true
			}
		}
	]
});

UserSchema.method.toJSON = function() {
	const user = this;
	const userObject = user.toObject();
	return _.omit(userObject, [ 'password', 'sessions' ]); //return the doc except password and sessions, shouldnt be available
};

UserSchema.methods.generateAccessAuthToken = function() {
	const user = this;
	return new Promise((resolve, reject) => {
		jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: '15m' }, (err, token) => {
			if (!err) {
				resolve(token);
			} else {
				reject();
			}
		});
	});
};

UserSchema.methods.generateRefreshToken = function() {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(64, (err, buf) => {
			if (!err) {
				let token = buf.toString('hex');
				return resolve(token);
			}
		});
	});
};

UserSchema.methods.createSession = function() {
	let user = this;
	return user
		.generateAccessAuthToken()
		.then((refreshToken) => {
			return saveSessionToDatabase(user, refreshToken);
		})
		.then((refreshToken) => {
			return refreshToken;
		})
		.catch((e) => {
			return Promise.reject('Failed to save session to database\n' + e);
		});
};

let saveSessionToDatabase = (user, refreshToken) => {
	return new Promise((resolve, reject) => {
		let expiresAt = generateRefreshTokenExpiryTime();

		user.sessions.push({ token: refreshToken, expiredAt });

		user
			.save()
			.then(() => {
				return resolve(refreshToken);
			})
			.catch((e) => {
				reject(e);
			});
	});
};

let generateRefreshTokenExpiryTime = () => {
	let daysUntilExpire = '10';
	let secondsUntilExpire = daysUntilExpire * 24 * 60 * 60;
	return Date.now() / 1000 + secondsUntilExpire;
};
