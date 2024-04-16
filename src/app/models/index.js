// import model relationships
const User = require('./User.js');
const ClassRoom = require('./ClassRoom.js');
const Faculty = require('./Faculty.js');


// User
User.belongsTo(ClassRoom, {
    foreignKey: 'lopId',
    as: 'classroom'
});

// model classroom
ClassRoom.belongsTo(Faculty, {foreignKey: 'khoaId', as: 'khoa'});
ClassRoom.hasOne(User, {sourceKey: 'gvId', foreignKey: 'id', as: 'giangvien', where: {type: 'teacher'}});
ClassRoom.hasMany(User, {foreignKey: 'id', as: 'sinhvien', where: {type: 'student'}});

module.exports = {User, ClassRoom, Faculty};