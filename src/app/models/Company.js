const sequelize = require("./db.js");
const DataTypes = require('sequelize');


const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sinhvien: {
        type: DataTypes.INTEGER,
        references: {
            model: 'students',
            key: 'id'
        }
    },
    lop: {
        type: DataTypes.INTEGER,
        references: {
            model: 'classes',
            key: 'id'
        }
    },
    gv: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('0','1', '2')
    },
    tenCongTy: DataTypes.STRING,
    viTri: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
}, {
    timestamps: false,
    tableName: 'companies'
});


module.exports = Company;