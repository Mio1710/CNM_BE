const sequelize = require("./db.js");
const DataTypes = require('sequelize');
const ClassRoom = require('./ClassRoom.js');
// constructor
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
    lopId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'classes',
            key: 'id'
        }
    },
    hinhanh: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.ENUM('admin', 'teacher', 'student')
}, {
    timestamps: false,
    tableName: 'users'
});

module.exports = User;