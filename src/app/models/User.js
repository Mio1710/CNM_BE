const sequelize = require("./db.js");
const DataTypes = require('sequelize');
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
    maKhoa: DataTypes.STRING,
    hinhanh: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.ENUM('admin', 'teacher', 'student')
}, {
    timestamps: false,
    tableName: 'users'
});

// user belong to one khoa
const Faculty = require('./Faculty.js');
User.belongsTo(Faculty, {
    foreignKey: 'maKhoa',
    as: 'faculty'
});


// const ClassRoom = require('./ClassRoom.js');
// User.belongsTo(ClassRoom, {
//     foreignKey: 'maKhoa',
//     as: 'faculty'
// });

module.exports = User;