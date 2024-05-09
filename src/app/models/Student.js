const sequelize = require("./db.js");
const DataTypes = require('sequelize');
const ClassRoom = require('./ClassRoom.js');
// constructor
// user include teacher and admin

const Student = sequelize.define('Student', {
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
    gvId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    hinhanh: DataTypes.STRING,
    phone: DataTypes.STRING,
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.hodem} ${this.ten}`;
        }
    }
}, {
    timestamps: false,
    tableName: 'students'
});


module.exports = Student;