const sequelize = require("./db.js");
const DataTypes = require('sequelize');
const ClassRoom = require('./ClassRoom.js');
// constructor
// user include teacher and admin

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    maso: DataTypes.STRING,
    hodem: DataTypes.STRING,
    ten: DataTypes.STRING,
    email: DataTypes.STRING,
    matKhau: DataTypes.STRING,
    khoaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'faculties',
            key: 'id'
        }
    },
    hinhanh: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.ENUM('admin', 'teacher')
}, {
    timestamps: false,
    tableName: 'users'
});


module.exports = User;