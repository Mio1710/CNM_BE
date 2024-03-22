const studentRouter = require('./students');
const classroomRouter = require('./classrooms');
const facultyRouter = require('./faculties');

function route(app) {
    app.use('/api/students', studentRouter);
    app.use('/api/classes', classroomRouter);
    app.use('/api/faculties', facultyRouter);
}

module.exports = route;