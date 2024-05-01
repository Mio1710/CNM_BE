const e = require('express');
const userModel = require('../models/User.js');
const studentModel = require('../models/Student.js');
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

		if (verified.type === 'student') {
			let user = await studentModel.findByPk(verified.maso);
			user.dataValues.type = 'student';
			req.user = user;
			console.log('req.user student', req.user);
		} else {
			let user = await userModel.findByPk(verified.maso);
			req.user = user;
			console.log('req.user', req.user);
		}
	}

	return next();
};

exports.isAdmin = async (req, res, next) => {
	if (req.user.type === 'admin') {
		return next();
	}
	return res.status(403).json({
		msg: 'Bạn không có quyền truy cập!',
		code: 'required_admin'
	});
};