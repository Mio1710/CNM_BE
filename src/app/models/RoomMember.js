const sequelize = require("./db.js");
const DataTypes = require('sequelize');

// constructor
const RoomMember = sequelize.define('RoomMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'rooms',
            key: 'id'
        },
    },
    memberable: DataTypes.ENUM('User', 'Student'),
    memberId: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    timestamps: false,
    tableName: 'room_members'
})
module.exports = RoomMember;