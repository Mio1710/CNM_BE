const User = require("../models/User");
const jwt = require('jsonwebtoken');
// import to use .env
require('dotenv').config();


exports.login = async  (req, res) => {
    const { maso, matKhau } = req.body;

  // This is a very basic authentication
  const user = await User.findOne({
    where: {
      maso
    }
  });
  
  if (user) {
    // Validate password

    const bcrypt = require('bcrypt');
    const isPasswordValid = bcrypt.compareSync(matKhau, user.matKhau);
    if (!isPasswordValid) {
      return res.status(401).send('Mật khẩu không chính xác.');
    }
    // User found and authenticated
    const token = jwt.sign({ maso: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    return res.json({
      msg: 'Đăng nhập thành công.',
      token,
      user,
    });
  } else {
    // User not found or password does not match
    res.status(401).send('Username or password incorrect');
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
    //check token and return user information with jwt nodejs
    const user = {
        ...req.user.dataValues,
        matKhau: undefined
    }
    res.send({ user: user});

}