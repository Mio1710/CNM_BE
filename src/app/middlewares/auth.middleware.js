const e = require('express');
const userModle = require('../models/User.js');
// import to use .env
require('dotenv').config();

const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.authorization;
	if (!accessTokenFromHeader) {
		return res.status(401).json({msg: 'Unauthorized!'});
	}
	// get exactly token
	const checkBearer = accessTokenFromHeader.split(' ')[0] === 'Bearer';
	if(!checkBearer) {
		return res.status(401).send('Access token không hợp lệ!');
	} else {
		const exactToken = accessTokenFromHeader.split(' ')[1];
		const accessTokenSecret = process.env.TOKEN_SECRET;

		const verified = await jwt.verify(exactToken, accessTokenSecret);
	
		console.log('verify', verified.maso);
	
		if (!verified) {
			return res
				.status(401)
				.json({msg: 'Unauthorized!'});
		}
	
		const user = await userModle.findByPk(verified.maso);
		req.user = user;
	}

	return next();
};