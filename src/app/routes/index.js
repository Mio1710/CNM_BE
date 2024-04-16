const studentRouter = require('./students');
const classroomRouter = require('./classrooms');
const facultyRouter = require('./faculties');
const authRouter = require('./authencation');

const authMiddleware = require('../middlewares/auth.middleware.js');

function route(app) {
    app.use('/api/users', [authMiddleware.isAuth, authMiddleware.isAdmin], studentRouter);
    app.use('/api/classes', authMiddleware.isAuth, classroomRouter);
    app.use('/api/faculties', facultyRouter);
    app.use('/api/auth', authRouter);
}

module.exports = route;