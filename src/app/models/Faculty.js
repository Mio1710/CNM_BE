const sequelize = require("./db.js");
const DataTypes = require('sequelize');

// constructor
const Faculty = sequelize.define('Faculty', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    maKhoa: DataTypes.STRING,
    ten: DataTypes.STRING
}, {
    timestamps: false,
    tableName: 'faculties'
});


module.exports = Faculty;