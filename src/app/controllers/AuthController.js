const User = require("../models/User");
const Student = require("../models/Student");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// import to use .env
require('dotenv').config();


exports.login = async  (req, res) => {
  const { maso, matKhau } = req.body;

  // This is a very basic authentication
  let user = await User.findOne({where: {maso}});
  let student = await Student.findOne({where: {maso}});

  if (!user) {
    user = student;
  }
  if (user) {
    // Validate password
    const isPasswordValid = bcrypt.compareSync(matKhau, user.matKhau);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: 'Tên đăng nhập hoặc mật khẩu không đúng'
      });
    }
    // User found and authenticated
    const token = jwt.sign({ maso: user.id, type: user.type ?? 'student' }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    return res.json({
      msg: 'Đăng nhập thành công.',
      token,
      user,
    });
  } else {
    // User not found or password does not match
    res.status(401).json({
      msg: 'Tên đăng nhập hoặc mật khẩu không đúng',
    });
  }

}

// refresh token
exports.refreshToken = async (req, res) => {
    const jwt = require("jsonwebtoken");
    const config = require("../config/auth.config.js");
    const token = jwt.sign({ id: req.userId }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
        id: req.userId,
        accessToken: token
    });
}

exports.getUser = async (req, res) => {
  // get token from header
    const accessTokenFromHeader = req.headers.authorization;
    const token = accessTokenFromHeader.split(' ')[1];
    console.log('get user', req.user.dataValues);
    //check token and return user information with jwt nodejs
    const user = {
        ...req.user.dataValues,
        matKhau: undefined,
        token
    }
    res.send({ user: user});

}

exports.logout = async (req, res) => {
    res.status(200).send({ msg: 'Đăng xuất thành công.' });
}

exports.changePassword = async (req, res) => {
  const { matKhau, newMatKhau } = req.body;
  let user = await User.findOne({where: {id: req.user.id}});

  let student = await Student.findOne({where: {id: req.user.id}});
  if (!user) {
    user = student;
  }
  if (user) {
    // Validate password
    const isPasswordValid = bcrypt.compareSync(matKhau, user.matKhau);
    if (!isPasswordValid) {
      return res.status(401).json({
        msg: 'Mật khẩu cũ không đúng'
      });
    } else {
      const hash = bcrypt.hashSync(newMatKhau, 10);
      user.matKhau = hash;
      user.save();
      return res.json({
        msg: 'Đổi mật khẩu thành công.',
      });
    }
  } else {
    // User not found or password does not match
    res.status(401).json({
      msg: 'Đã xảy ra lỗi',
    });
  }
}