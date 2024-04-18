// import model relationships
const User = require('./User.js');
const ClassRoom = require('./ClassRoom.js');
const Faculty = require('./Faculty.js');
const Student = require('./Student.js');


// User
User.belongsTo(Faculty, {foreignKey: 'khoaId', as: 'faculty'}); // giang vien sẽ thuộc 1 khoa
User.hasMany(Student, {foreignKey: 'gvId', as: 'students'}); // giang vien se giam sat nhieu sinh vien

// model classroom
ClassRoom.belongsTo(Faculty, {foreignKey: 'khoaId', as: 'khoa'});
ClassRoom.hasOne(User, {sourceKey: 'gvId', foreignKey: 'id', as: 'giangvien', where: {type: 'teacher'}});
ClassRoom.hasMany(Student, {foreignKey: 'lopId', as: 'students'});


// model student
Student.belongsTo(ClassRoom, {foreignKey: 'lopId', as: 'classroom'});
Student.belongsTo(User, {sourceKey: 'id', foreignKey: 'gvId', as: 'giangvien'});

module.exports = {User, ClassRoom, Faculty, Student};