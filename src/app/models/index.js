// import model relationships
const User = require('./User.js');
const ClassRoom = require('./ClassRoom.js');
const Faculty = require('./Faculty.js');
const Student = require('./Student.js');
const Room = require('./Room.js');
const RoomMember = require('./RoomMember.js');
const Company = require('./Company.js');


// User
User.belongsTo(Faculty, {foreignKey: 'khoaId', as: 'faculty'}); // giang vien sẽ thuộc 1 khoa
User.hasMany(Student, {foreignKey: 'gvId', as: 'students'}); // giang vien se giam sat nhieu sinh vien
User.hasMany(RoomMember, {foreignKey: 'memberId', as: 'rooms'}); // user co the tham gia nhieu room
User.hasMany(ClassRoom, {foreignKey: 'gvId', as: 'classes'}); // giang vien co the giang nhieu lop

// model classroom
ClassRoom.belongsTo(Faculty, {foreignKey: 'khoaId', as: 'khoa'});
ClassRoom.hasMany(User, {sourceKey: 'gvId', foreignKey: 'id', as: 'giangvien', where: {type: 'teacher'}});
ClassRoom.hasMany(Student, {foreignKey: 'lopId', as: 'students'});
ClassRoom.hasMany(Company, { foreignKey: 'lop' });



// model student
Student.belongsTo(ClassRoom, {foreignKey: 'lopId', as: 'classroom'});
Student.belongsTo(User, {sourceKey: 'id', foreignKey: 'gvId', as: 'giangvien'});
Student.hasMany(RoomMember, {foreignKey: 'memberId', as: 'rooms'}); // sinh vien co the tham gia nhieu room
Student.hasOne(Company, {foreignKey: 'sinhvien', as: 'company'});

// model room
Room.belongsTo(User, {foreignKey: 'leaderId', as: 'leader'});


// model room member
RoomMember.belongsTo(Room, {foreignKey: 'roomId', as: 'room'});
RoomMember.belongsTo(User, {foreignKey: 'memberId', as: 'teachermembers', constraints: false});
RoomMember.belongsTo(Student, {foreignKey: 'memberId', as: 'studentmembers', constraints: false});

// model company
//Company.hasMany(Student, {foreignKey: 'sinhvien', as: 'students'});
//Company.belongsTo(ClassRoom, {foreignKey: 'lop', targetKey: 'id', as: 'classroom'});
Company.belongsTo(Student, {sourceKey: 'id', foreignKey: 'sinhvien', as: 'student'})

module.exports = {User, ClassRoom, Faculty, Student, Room, Company }; 