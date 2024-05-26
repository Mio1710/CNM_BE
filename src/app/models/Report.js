const sequelize = require("./db.js");
const DataTypes = require('sequelize');


const Report = sequelize.define('Report', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ngay_bao_cao: DataTypes.DATE,
    sv: {
        type: DataTypes.INTEGER,
        references: {
            model: 'students',
            key: 'id'
        }
    },
    diem: DataTypes.FLOAT,
    danhgia: DataTypes.STRING,
    diemDN: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'reports'
});


module.exports = Report;