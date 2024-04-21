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
    gvId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    khoaId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'faculties',
            key: 'id'
        }
    },
}, {
    timestamps: false,
    tableName: 'classes'
});

const User = require('./User.js');

module.exports = ClassRoom;