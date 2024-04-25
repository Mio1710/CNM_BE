const sequelize = require("./db.js");
const DataTypes = require('sequelize');

// constructor
const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    leaderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false,
    tableName: 'users'
});


module.exports = Room;