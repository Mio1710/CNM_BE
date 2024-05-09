const sequelize = require("./db.js");
const DataTypes = require('sequelize');


const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commit: DataTypes.STRING,
    sv_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'students',
            key: 'id'
        }
    },
    date: DataTypes.DATE,
    report_file: DataTypes.STRING,
    report_type: DataTypes.ENUM('0','1','2','3','4','5','6','7','8','9','10')
    
}, {
    timestamps: false,
    tableName: 'files'
});


module.exports = File;