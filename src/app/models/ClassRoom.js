const sequelize = require("./db.js");
const DataTypes = require('sequelize');

// constructor
const ClassRoom = sequelize.define('ClassRoom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    maLop:  DataTypes.STRING,
    ten: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    gv: DataTypes.INTEGER
}, {
    timestamps: false,
    tableName: 'classes'
});

// class has one gv
const User = require('./User.js');
ClassRoom.hasOne(User, {
    name: 'gv',
    foreignKey: 'id',
    as: 'giangvien'
});

// ClassRoom.hasMany(User, {
//   foreignKey: 'id',
//   as: 'sinhvien'
// });
module.exports = ClassRoom;